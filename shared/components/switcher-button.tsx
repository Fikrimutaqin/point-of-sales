import { Button } from "./ui/button";

export default function SwitcherButton({buttons}: {buttons: string[]}, activeButton: string, setActiveButton: (button: string) => void) {
    return (
        <div className="w-full rounded-full bg-gray-300 flex flex-row items-center gap-x-2">
            {buttons.map((button) => (
                <Button onClick={() => setActiveButton(button)} className={`w-full rounded-full! ${activeButton === button ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-transparent text-emerald-600 hover:bg-transparent"}`} key={button}>{button}</Button>
            ))}
        </div>
    );
}