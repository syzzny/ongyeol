"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import styles from "./Header.module.scss";

const NAV_ITEMS = [
  { label: "병원소개", href: "/about" },
  { label: "의료진", href: "/doctors" },
  { label: "시술안내", href: "/treatments" },
  { label: "뉴스룸", href: "/news" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  /**
   * 메뉴 링크를 눌렀을 때
   * - 지금 보고 있는 페이지 안의 위치(/#consult 등)라면 직접 그 자리로 스크롤
   *   (주소가 이미 같으면 Link는 아무 일도 하지 않기 때문)
   * - 다른 페이지로 가는 링크라면 Link가 하던 대로 이동
   */
  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    closeMenu();

    const [path, hash] = href.split("#");
    if (!hash || window.location.pathname !== (path || "/")) return;

    const target = document.getElementById(hash);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView(); // 부드러운 이동과 헤더 높이만큼의 여백은 globals.scss 설정을 따름
    window.history.replaceState(null, "", `#${hash}`);
  };

  // 메뉴가 열려 있는 동안 뒤 화면 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // 화면이 넓어지거나 Esc를 누르면 메뉴 닫기
  useEffect(() => {
    const wideScreen = window.matchMedia("(min-width: 768px)");

    const handleResize = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    wideScreen.addEventListener("change", handleResize);
    window.addEventListener("keydown", handleKeydown);

    return () => {
      wideScreen.removeEventListener("change", handleResize);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <header className={styles.header}>
      <Link
        href="/"
        className={styles.logo}
        onClick={closeMenu}
      >
        <span className={styles.symbol} aria-hidden="true" />
        <span className={styles.wordmark}>
          <strong>온결피부과</strong>
          <small>ONGYEOL DERMATOLOGY</small>
        </span>
      </Link>

      <nav
        id="gnb"
        className={`${styles.nav} ${isOpen ? styles.open : ""}`}
        aria-label="주 메뉴"
      >
        <ul className={styles.navList}>
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={styles.navLink}
                onClick={(event) => handleLinkClick(event, item.href)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.actions}>
        <Link
          href="/#consult"
          className={styles.reserve}
          onClick={(event) => handleLinkClick(event, "/#consult")}
        >
          진료예약
        </Link>
        <button
          type="button"
          className={styles.menuButton}
          aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={isOpen}
          aria-controls="gnb"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}