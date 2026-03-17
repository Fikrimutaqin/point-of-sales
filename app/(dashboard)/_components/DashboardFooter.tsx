export default function DashboardFooter() {
  return (
    <footer className="flex w-full items-center gap-4 border-t border-border bg-background px-4 lg:pl-28 py-4 bottom-0 left-0 right-0">
      <div className="w-full">
        <p className="truncate text-xs text-muted-foreground text-center font-semibold">
          Copyright © {new Date().getFullYear()} POSKUY. All rights reserved.
        </p>
      </div>
    </footer>
  );
}