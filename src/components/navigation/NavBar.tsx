import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="flex items-center gap-8 text-sm">
      <NavItem url="/" item="Home" />
      <NavItem url="/habit-tracker" item="Habit Tracker" />
      <NavItem url="/pomodoro" item="Pomodoro" />
      <NavItem url="/documentation" item="Docs" />
    </nav>
  );
}

function NavItem({ url, item }: { url: string; item: string }) {
  return (
    <NavLink
      to={url}
      className={({ isActive }) =>
        ` ${isActive ? "border-b-2 border-white" : "hover-links"}`
      }
    >
      {item}
    </NavLink>
  );
}
