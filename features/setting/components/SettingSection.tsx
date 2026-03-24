"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { getStoredRawUser } from "@/lib/auth-storage";
import { Card } from "@/shared/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { DataTable, type DataTableColumn } from "@/shared/components/data-table";
import type { Category, Product, Role, SettingTabKey, User } from "@/features/setting/types";
import { initialCategories, initialProducts, initialRoles, initialUsers } from "@/features/setting/services/data";
import { ChevronDown, LockKeyhole, UserCog } from "lucide-react";
import { getInitials } from "@/lib/name";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

function formatIDR(amount: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount);
}

function isAdminRole(role: unknown): boolean {
  if (typeof role === "string") return role.toLowerCase() === "admin";
  if (role && typeof role === "object") {
    const maybeName = (role as { name?: unknown }).name;
    if (typeof maybeName === "string") return maybeName.toLowerCase() === "admin";
  }
  return false;
}

function updateStoredUser(next: { name: string; email: string; avatar: string }) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("auth:user-updated", { detail: next }));
  try {
    const rawStr = window.localStorage.getItem("user");
    const parsed = rawStr ? (JSON.parse(rawStr) as unknown) : null;
    const base = parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};

    base.name = next.name;
    base.email = next.email;
    base.avatar = next.avatar;

    const nested = base.user;
    if (!nested || typeof nested !== "object") {
      base.user = { name: next.name, email: next.email };
    } else {
      (nested as Record<string, unknown>).name = next.name;
      (nested as Record<string, unknown>).email = next.email;
    }

    window.localStorage.setItem("user", JSON.stringify(base));
  } catch {
    return;
  }
}

type Props = {
  className?: string;
};

export default function SettingSection({ className }: Props) {
  const [active, setActive] = useState<SettingTabKey>("profile");
  const [isAdmin, setIsAdmin] = useState(false);

  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profileAvatar, setProfileAvatar] = useState("");
  const [profileMessage, setProfileMessage] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  const [categories, setCategories] = useState<Category[]>(() => [...initialCategories]);
  const [products, setProducts] = useState<Product[]>(() => [...initialProducts]);
  const [roles, setRoles] = useState<Role[]>(() => [...initialRoles]);
  const [users, setUsers] = useState<User[]>(() => [...initialUsers]);

  useEffect(() => {
    const t = setTimeout(() => {
      const raw = getStoredRawUser();
      const name = raw?.user?.name ?? raw?.name ?? "";
      const email = raw?.email ?? raw?.user?.email ?? "";
      const avatar = raw?.avatar ?? "";
      setProfileName(name);
      setProfileEmail(email);
      setProfileAvatar(avatar);
      setIsAdmin(isAdminRole(raw?.role));
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const tabs = useMemo(() => {
    const base: Array<{ key: SettingTabKey; label: string }> = [
      { key: "profile", label: "Edit Profile" },
      { key: "password", label: "Ubah Password" },
      { key: "product", label: "Product" },
      { key: "category", label: "Category" },
    ];
    if (isAdmin) {
      base.push({ key: "role", label: "Roles" });
      base.push({ key: "user-role", label: "Assign Role" });
    }
    return base;
  }, [isAdmin]);

  const categoryById = useMemo(() => new Map(categories.map((c) => [c.id, c])), [categories]);
  const roleById = useMemo(() => new Map(roles.map((r) => [r.id, r])), [roles]);

  const onSaveProfile = () => {
    updateStoredUser({ name: profileName, email: profileEmail, avatar: profileAvatar });
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("auth:user-updated", {
          detail: { name: profileName, email: profileEmail, avatar: profileAvatar },
        })
      );
    }
    setProfileMessage("Profile updated (mock).");
    const t = setTimeout(() => setProfileMessage(null), 2500);
    return () => clearTimeout(t);
  };

  const onAvatarFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setProfileAvatar(result);
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("auth:user-updated", {
            detail: { name: profileName, email: profileEmail, avatar: result },
          })
        );
      }
    };
    reader.readAsDataURL(file);
  };

  const onChangePassword = () => {
    if (!newPassword || newPassword !== confirmPassword) {
      setPasswordMessage("Password confirmation does not match.");
      return;
    }
    setPasswordMessage("Password updated (mock).");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    const t = setTimeout(() => setPasswordMessage(null), 2500);
    return () => clearTimeout(t);
  };

  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState("");

  const resetCategoryForm = () => {
    setEditCategoryId(null);
    setCategoryName("");
  };

  const onSubmitCategory = () => {
    const name = categoryName.trim();
    if (!name) return;
    if (editCategoryId) {
      setCategories((prev) => prev.map((c) => (c.id === editCategoryId ? { ...c, name } : c)));
      resetCategoryForm();
      return;
    }
    const id = `cat-${Date.now()}`;
    setCategories((prev) => [{ id, name }, ...prev]);
    resetCategoryForm();
  };

  const onEditCategory = (c: Category) => {
    setEditCategoryId(c.id);
    setCategoryName(c.name);
    setActive("category");
  };

  const onDeleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setProducts((prev) => prev.map((p) => (p.categoryId === id ? { ...p, categoryId: categories[0]?.id ?? p.categoryId } : p)));
    if (editCategoryId === id) resetCategoryForm();
  };

  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [productName, setProductName] = useState("");
  const [productSku, setProductSku] = useState("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productCategoryId, setProductCategoryId] = useState<string>(() => categories[0]?.id ?? "");

  useEffect(() => {
    if (!productCategoryId && categories[0]?.id) {
      const t = setTimeout(() => setProductCategoryId(categories[0]!.id), 0);
      return () => clearTimeout(t);
    }
  }, [categories, productCategoryId]);

  const resetProductForm = () => {
    setEditProductId(null);
    setProductName("");
    setProductSku("");
    setProductPrice("");
    setProductCategoryId(categories[0]?.id ?? "");
  };

  const onSubmitProduct = () => {
    const name = productName.trim();
    const sku = productSku.trim();
    const price = Number(productPrice);
    if (!name || !sku || !Number.isFinite(price) || price < 0 || !productCategoryId) return;
    if (editProductId) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editProductId ? { ...p, name, sku, price, categoryId: productCategoryId } : p
        )
      );
      resetProductForm();
      return;
    }
    const id = `prd-${Date.now()}`;
    setProducts((prev) => [{ id, name, sku, price, categoryId: productCategoryId }, ...prev]);
    resetProductForm();
  };

  const onEditProduct = (p: Product) => {
    setEditProductId(p.id);
    setProductName(p.name);
    setProductSku(p.sku);
    setProductPrice(String(p.price));
    setProductCategoryId(p.categoryId);
    setActive("product");
  };

  const onDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (editProductId === id) resetProductForm();
  };

  const [editRoleId, setEditRoleId] = useState<string | null>(null);
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");

  const resetRoleForm = () => {
    setEditRoleId(null);
    setRoleName("");
    setRoleDescription("");
  };

  const onSubmitRole = () => {
    const name = roleName.trim().toLowerCase();
    if (!name) return;
    if (editRoleId) {
      setRoles((prev) => prev.map((r) => (r.id === editRoleId ? { ...r, name, description: roleDescription.trim() || undefined } : r)));
      resetRoleForm();
      return;
    }
    const id = `role-${Date.now()}`;
    setRoles((prev) => [{ id, name, description: roleDescription.trim() || undefined }, ...prev]);
    resetRoleForm();
  };

  const onEditRole = (r: Role) => {
    setEditRoleId(r.id);
    setRoleName(r.name);
    setRoleDescription(r.description ?? "");
    setActive("role");
  };

  const onDeleteRole = (id: string) => {
    if (id === "role-admin") return;
    setRoles((prev) => prev.filter((r) => r.id !== id));
    setUsers((prev) => prev.map((u) => (u.roleId === id ? { ...u, roleId: "role-cashier" } : u)));
    if (editRoleId === id) resetRoleForm();
  };

  const onAssignRole = (userId: string, roleId: string) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, roleId } : u)));
  };

  const productColumns = useMemo<DataTableColumn<Product>[]>(
    () => [
      { id: "name", header: "Product", cell: (p) => <div className="font-semibold">{p.name}</div> },
      { id: "sku", header: "SKU", cell: (p) => <div className="text-muted-foreground">{p.sku}</div>, headerClassName: "w-[160px]" },
      { id: "category", header: "Category", cell: (p) => categoryById.get(p.categoryId)?.name ?? "—", headerClassName: "w-[160px]" },
      { id: "price", header: "Price", cell: (p) => formatIDR(p.price), headerClassName: "w-[160px] text-right", cellClassName: "text-right font-semibold" },
      {
        id: "actions",
        header: "Actions",
        cell: (p) => (
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" className="h-9 rounded-full px-4 text-xs font-semibold" onClick={() => onEditProduct(p)}>
              Edit
            </Button>
            <Button type="button" variant="outline" className="h-9 rounded-full px-4 text-xs font-semibold" onClick={() => onDeleteProduct(p.id)}>
              Delete
            </Button>
          </div>
        ),
        headerClassName: "w-[220px] text-right",
        cellClassName: "text-right",
      },
    ],
    [categoryById]
  );

  const categoryColumns = useMemo<DataTableColumn<Category>[]>(
    () => [
      { id: "name", header: "Category", cell: (c) => <div className="font-semibold">{c.name}</div> },
      {
        id: "actions",
        header: "Actions",
        cell: (c) => (
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" className="h-9 rounded-full px-4 text-xs font-semibold" onClick={() => onEditCategory(c)}>
              Edit
            </Button>
            <Button type="button" variant="outline" className="h-9 rounded-full px-4 text-xs font-semibold" onClick={() => onDeleteCategory(c.id)}>
              Delete
            </Button>
          </div>
        ),
        headerClassName: "w-[220px] text-right",
        cellClassName: "text-right",
      },
    ],
    [editCategoryId, categories]
  );

  const roleColumns = useMemo<DataTableColumn<Role>[]>(
    () => [
      { id: "name", header: "Role", cell: (r) => <div className="font-semibold">{r.name}</div>, headerClassName: "w-[160px]" },
      { id: "desc", header: "Description", cell: (r) => r.description ?? "—" },
      {
        id: "actions",
        header: "Actions",
        cell: (r) => (
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" className="h-9 rounded-full px-4 text-xs font-semibold" onClick={() => onEditRole(r)}>
              Edit
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-9 rounded-full px-4 text-xs font-semibold"
              disabled={r.id === "role-admin"}
              onClick={() => onDeleteRole(r.id)}
            >
              Delete
            </Button>
          </div>
        ),
        headerClassName: "w-[220px] text-right",
        cellClassName: "text-right",
      },
    ],
    [editRoleId, roles]
  );

  const userColumns = useMemo<DataTableColumn<User>[]>(
    () => [
      { id: "name", header: "User", cell: (u) => <div className="font-semibold">{u.name}</div> },
      { id: "email", header: "Email", cell: (u) => <div className="text-muted-foreground">{u.email}</div> },
      {
        id: "role",
        header: "Role",
        cell: (u) => {
          const currentRole = roleById.get(u.roleId);
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9 rounded-full px-4 text-xs font-semibold">
                  {currentRole?.name ?? "—"}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {roles.map((r) => (
                  <DropdownMenuItem key={r.id} onClick={() => onAssignRole(u.id, r.id)}>
                    {r.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
        headerClassName: "w-[200px]",
      },
    ],
    [roleById, roles]
  );

  return (
    <div className={cn("w-full flex flex-col gap-4", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Setting</h2>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <Card className="rounded-2xl p-4 lg:w-[280px]">
          <div className="text-sm font-semibold text-muted-foreground">Menu</div>
          <div className="mt-3 flex flex-col gap-2">
            {tabs.map((t) => {
              const activeTab = active === t.key;
              return (
                <Button
                  key={t.key}
                  type="button"
                  variant="outline"
                  className={cn(
                    "h-11 justify-start rounded-2xl! font-semibold",
                    activeTab ? "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white" : "bg-background"
                  )}
                  onClick={() => setActive(t.key)}
                >
                  {t.label}
                </Button>
              );
            })}
          </div>
        </Card>

        <div className="flex-1">
          {active === "profile" ? (
            <Card className="rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">Edit Profile</div>
                <UserCog className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center">
                <Avatar className="h-20 w-20">
                  {profileAvatar ? (
                    <AvatarImage
                      src={profileAvatar}
                      alt={getInitials(profileName || profileEmail || "User")}
                    />
                  ) : null}
                  <AvatarFallback className="text-lg font-semibold">
                    {getInitials(profileName || profileEmail || "User")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="profile-avatar">Photo Profile</Label>
                  <Input id="profile-avatar" type="file" accept="image/*" onChange={onAvatarFileChange} />
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 rounded-2xl px-4 font-semibold"
                      disabled={!profileAvatar}
                      onClick={() => setProfileAvatar("")}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="profile-name">Name</Label>
                  <Input id="profile-name" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-email">Email</Label>
                  <Input id="profile-email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} />
                </div>
              </div>
              {profileMessage ? <div className="mt-4 text-sm font-semibold text-emerald-700">{profileMessage}</div> : null}
              <div className="mt-5 flex items-center justify-end gap-2">
                <Button type="button" variant="outline" className="h-11 rounded-2xl px-5 font-semibold" onClick={() => {
                  const t = setTimeout(() => {
                    const raw = getStoredRawUser();
                    setProfileName(raw?.user?.name ?? raw?.name ?? "");
                    setProfileEmail(raw?.email ?? raw?.user?.email ?? "");
                    setProfileAvatar(raw?.avatar ?? "");
                  }, 0);
                  return () => clearTimeout(t);
                }}>
                  Reset
                </Button>
                <Button type="button" className="h-11 rounded-2xl px-5 font-semibold bg-emerald-600 hover:bg-emerald-700" onClick={onSaveProfile}>
                  Save
                </Button>
              </div>
            </Card>
          ) : null}

          {active === "password" ? (
            <Card className="rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">Ubah Password</div>
                <LockKeyhole className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="pass-current">Current Password</Label>
                  <Input id="pass-current" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pass-new">New Password</Label>
                  <Input id="pass-new" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pass-confirm">Confirm Password</Label>
                  <Input id="pass-confirm" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
              </div>
              {passwordMessage ? <div className="mt-4 text-sm font-semibold text-emerald-700">{passwordMessage}</div> : null}
              <div className="mt-5 flex items-center justify-end">
                <Button type="button" className="h-11 rounded-2xl px-5 font-semibold bg-emerald-600 hover:bg-emerald-700" onClick={onChangePassword}>
                  Update Password
                </Button>
              </div>
            </Card>
          ) : null}

          {active === "product" ? (
            <div className="flex flex-col gap-4">
              <Card className="rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">{editProductId ? "Edit Product" : "Create Product"}</div>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="prd-name">Name</Label>
                    <Input id="prd-name" value={productName} onChange={(e) => setProductName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prd-sku">SKU</Label>
                    <Input id="prd-sku" value={productSku} onChange={(e) => setProductSku(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prd-price">Price</Label>
                    <Input id="prd-price" inputMode="numeric" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                  </div>
                  <div className="space-y-2 w-full">
                    <Label>Category</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button type="button" variant="outline" className="h-10 w-full justify-between rounded-2xl px-4 font-semibold">
                          <div className="flex flex-row justify-between items-center w-full">
                            {categoryById.get(productCategoryId)?.name ?? "Select Category"}
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="start"
                        className="w-(--radix-popper-anchor-width) min-w-(--radix-popper-anchor-width)"
                      >
                        {categories.map((c) => (
                          <DropdownMenuItem key={c.id} onClick={() => setProductCategoryId(c.id)}>
                            {c.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-end gap-2">
                  <Button type="button" variant="outline" className="h-11 rounded-2xl px-5 font-semibold" onClick={resetProductForm}>
                    Clear
                  </Button>
                  <Button type="button" className="h-11 rounded-2xl px-5 font-semibold bg-emerald-600 hover:bg-emerald-700" onClick={onSubmitProduct}>
                    {editProductId ? "Save" : "Create"}
                  </Button>
                </div>
              </Card>
              <DataTable title="Products" columns={productColumns} rows={products} getRowKey={(p) => p.id} />
            </div>
          ) : null}

          {active === "category" ? (
            <div className="flex flex-col gap-4">
              <Card className="rounded-2xl p-5">
                <div className="text-lg font-semibold">{editCategoryId ? "Edit Category" : "Create Category"}</div>
                <div className="mt-5 space-y-2">
                  <Label htmlFor="cat-name">Name</Label>
                  <Input id="cat-name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                </div>
                <div className="mt-5 flex items-center justify-end gap-2">
                  <Button type="button" variant="outline" className="h-11 rounded-2xl px-5 font-semibold" onClick={resetCategoryForm}>
                    Clear
                  </Button>
                  <Button type="button" className="h-11 rounded-2xl px-5 font-semibold bg-emerald-600 hover:bg-emerald-700" onClick={onSubmitCategory}>
                    {editCategoryId ? "Save" : "Create"}
                  </Button>
                </div>
              </Card>
              <DataTable title="Categories" columns={categoryColumns} rows={categories} getRowKey={(c) => c.id} />
            </div>
          ) : null}

          {active === "role" ? (
            isAdmin ? (
              <div className="flex flex-col gap-4">
                <Card className="rounded-2xl p-5">
                  <div className="text-lg font-semibold">{editRoleId ? "Edit Role" : "Create Role"}</div>
                  <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="role-name">Role Name</Label>
                      <Input id="role-name" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role-desc">Description</Label>
                      <Input id="role-desc" value={roleDescription} onChange={(e) => setRoleDescription(e.target.value)} />
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-end gap-2">
                    <Button type="button" variant="outline" className="h-11 rounded-2xl px-5 font-semibold" onClick={resetRoleForm}>
                      Clear
                    </Button>
                    <Button type="button" className="h-11 rounded-2xl px-5 font-semibold bg-emerald-600 hover:bg-emerald-700" onClick={onSubmitRole}>
                      {editRoleId ? "Save" : "Create"}
                    </Button>
                  </div>
                </Card>
                <DataTable title="Roles" columns={roleColumns} rows={roles} getRowKey={(r) => r.id} />
              </div>
            ) : (
              <Card className="rounded-2xl p-6">
                <div className="text-lg font-semibold">Admin Only</div>
                <div className="mt-1 text-muted-foreground">Roles management is only available for admin.</div>
              </Card>
            )
          ) : null}

          {active === "user-role" ? (
            isAdmin ? (
              <DataTable title="Assign Role to User" columns={userColumns} rows={users} getRowKey={(u) => u.id} />
            ) : (
              <Card className="rounded-2xl p-6">
                <div className="text-lg font-semibold">Admin Only</div>
                <div className="mt-1 text-muted-foreground">Role assignment is only available for admin.</div>
              </Card>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}
