import { useLayoutEffect, useState } from "react";
import { css, cx } from "../../styled-system/css";
import { hstack, vstack } from "../../styled-system/patterns";
import logoSvg from "../assets/logo.svg";
import menuIconSvg from "../assets/menu-icon.svg";
import closeIconSvg from "../assets/close-icon.svg";
import { type NavProps } from "./types";

interface Props {
  navItems?: NavProps[];
}

const coverHeader = css({
  py: "12px",
  transition: "padding 0.2s ease-in-out",
  backgroundColor: "#FFFFFF",
  boxShadow: '0px 4px 8px rgba(0,0,0,0.1)'
});

const activeNavSx = { fontWeight: 800, color: "#F74774" };

function Header(props: Props) {
  const [isCoverContent, setIsCoverContent] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorsQueue, setAnchorsQueue] = useState<string[]>([]);

  const {
    navItems = [
      {
        label: "Home",
        href: "/",
        type: "page",
      },
      {
        label: "Games",
        href: "/games",
        type: "page",
      },
      {
        label: "Contact",
        href: "#contact",
        type: "anchor",
      },
    ],
  } = props;
  const activedAnchor = anchorsQueue[anchorsQueue.length - 1];

  useLayoutEffect(() => {
    const heroSectionElem = document.getElementById("hero-section");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsCoverContent(!entry.isIntersecting);
      });
    }, { rootMargin: '-100px 0px' });
    if (heroSectionElem) {
      observer.observe(heroSectionElem);
    }

    const sectiontAnchorObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = `#${entry.target.id}`;
        if (entry.isIntersecting) {
          setAnchorsQueue((queue) => [...queue, id]);
        } else {
          setAnchorsQueue((queue) => queue.filter((item) => item !== id));
        }
      });
    }, { rootMargin: '72px 0px', threshold: 0.75 });
    navItems
      .filter((nav) => nav.type === "anchor")
      .forEach((nav) => {
        const elem = document.querySelector(nav.href);
        if (elem) {
          1;
          sectiontAnchorObserver.observe(elem);
        }
      });
  }, []);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const getNavItemActivedSx = (nav: NavProps) => {
    if (typeof window === "undefined") return undefined;
    const isActivedAnchor = nav.type === "anchor" && nav.href === activedAnchor;
    const isActivedPage = nav.type === "page" && (window.location.pathname === nav.href || window.location.pathname === nav.href + "/");
    const isActived = isActivedAnchor || isActivedPage;
    return isActived ? css(activeNavSx) : undefined;
  };

  return (
    <header
      id="layout-header"
      className={cx(
        isMenuOpen && css({ background: "#FFFFFF", boxShadow: '0px 4px 8px rgba(0,0,0,0.1)' }),
        !isMenuOpen && isCoverContent && coverHeader,
        css({
          position: "fixed",
          top: "0",
          left: "0",
          right: 0,
          zIndex: 100,
          px: { base: "10px", md: "32px" },
          py: { base: "16px", md: isCoverContent ? "12px" : "0px" },
          pt: { base: "16px", md: "12px" }
        }),
      )}
    >
      <div className={hstack({ justifyContent: "space-between", alignItems: "center", gap: 2 })}>
        <div className={css({ flexShrink: 0 })}>
          <a href="/">
            <img
              className={css({ width: "auto", height: { base: "32px", md: isCoverContent ? '48px' : '56px' }, transition: "height 0.2s ease-in-out" })}
              src={logoSvg.src}
              alt="Gaming Panda Logo"
              height={56}
            />
          </a>
        </div>

        <div className={cx(hstack({ gap: "24px" }), css({ display: { base: "none", md: "block" } }))}>
          <nav>
            <ul className={hstack({ gap: "64px" })}>
              {navItems.map((nav) => {
                return (
                  <li key={nav.href}>
                    <a
                      className={cx(getNavItemActivedSx(nav), css({ textStyle: "18_500_100", _hover: { color: "#F74774" } }))}
                      href={nav.href}
                    >
                      {nav.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <button className={css({ display: { base: "block", md: "none" } })} onClick={toggleMenu}>
          <img
            src={isMenuOpen ? closeIconSvg.src : menuIconSvg.src}
            alt={`${isMenuOpen ? "Close" : "Open"} navigation menu`}
            width="32"
            height="32"
          />
        </button>
      </div>

      {isMenuOpen && (
        <div>
          <nav className={css({ mx: "40px", my: "32px" })}>
            <ul className={vstack({ gap: "0px", alignItems: "stretch" })}>
              {navItems.map((nav, index) => (
                <li
                  key={nav.href}
                  className={css({ animation: "fadeIn 0.4s forwards", opacity: 0 })}
                  style={{ animationDelay: `${0.05 * index}s` }}
                >
                  <a
                    className={cx(
                      getNavItemActivedSx(nav),
                      css({
                        textStyle: "18_500_100",
                        py: "24px",
                        display: "block",
                        width: "100%",
                        textAlign: "center",
                      }),
                    )}
                    href={nav.href}
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                  >
                    {nav.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
