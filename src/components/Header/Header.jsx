import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import styles from "./Header.module.css";

const popularItems = [
  { id: 1, name: "볼트 M01", img: "/images/popular1.avif" },
  { id: 2, name: "시나몬 01", img: "/images/popular2.avif" },
  { id: 3, name: "도도 T9", img: "/images/popular3.avif" },
  { id: 4, name: "림 M01", img: "/images/popular4.avif" },
  { id: 5, name: "라솔라 01(G)", img: "/images/popular5.avif" },
];

const nav = [
  { label: "구매하기", medium: true },
  { label: "안경", medium: false },
  { label: "컬렉션", medium: false },
  { label: "스토어", medium: false },
  { label: "더 알아보기", medium: true },
];

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="11" cy="11" r="7" />
    <line x1="16.5" y1="16.5" x2="22" y2="22" />
  </svg>
);

const Header = () => {
  const search = (event) => {
    if (event.key === 'Enter') {
      let keyword = event.target.value;
      navigate(`/?q=${keyword}`);
      setSearchOpen(false);
    }
  }
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [recentItems, setRecentItems] = useState([]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const openSearch = () => {
    const stored = localStorage.getItem("recentItems");
    setRecentItems(stored ? JSON.parse(stored) : []);
    setSearchOpen(true);
  };

  const clearRecent = () => {
    localStorage.removeItem("recentItems");
    setRecentItems([]);
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <header className={styles.header}>
        {/* 모바일: 왼쪽 (햄버거 + 검색) */}
        <div className={styles.mobileLeft}>
          <button className={styles.iconBtn} aria-label="메뉴" onClick={() => setMenuOpen(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <button className={styles.iconBtn} aria-label="검색" onClick={openSearch}>
            <SearchIcon />
          </button>
        </div>

        {/* 데스크탑: 왼쪽 내비게이션 */}
        <ul className={styles.nav}>
          {nav.map((menu) => (
            <li key={menu.label} className={!menu.medium ? styles.navItemFull : ""}>
              <Link to="#" className={styles.navLink}>{menu.label}</Link>
            </li>
          ))}
        </ul>

        <Link to="/" className={styles.logo}>
          <img src="/images/logo.svg" alt="로고" />
        </Link>

        <div className={styles.actions}>
          <span className={styles.langText}></span>
          {/* 데스크탑 전용 검색 버튼 */}
          <button className={`${styles.iconBtn} ${styles.desktopOnly}`} aria-label="검색" onClick={openSearch}>
            <SearchIcon />
          </button>
          {/* 유저 메뉴 */}
          <div className={styles.userMenu}>
            <button className={styles.iconBtn} aria-label="유저메뉴" onClick={() => setUserMenuOpen(prev => !prev)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </button>
            {userMenuOpen && (
              <div className={styles.userDropdown}>
                {isLoggedIn ? (
                  <>
                    <button className={styles.dropdownBtn} onClick={() => { navigate('/user'); setUserMenuOpen(false); }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                    </button>
                    <button className={styles.dropdownBtn} onClick={logout}>로그아웃</button>
                  </>
                ) : (
                  <button className={styles.dropdownBtn} onClick={() => { navigate('/login'); setUserMenuOpen(false); }}>로그인</button>
                )}
              </div>
            )}
          </div>
          <button className={styles.iconBtn} aria-label="장바구니">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="7" width="18" height="14" rx="1" />
              <path d="M8 7V5a4 4 0 0 1 8 0v2" />
            </svg>
          </button>
        </div>
      </header>

      {/* 모바일 메뉴 드로어 */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
        <button className={styles.menuCloseBtn} onClick={() => setMenuOpen(false)} aria-label="닫기">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <ul className={styles.mobileNav}>
          {nav.map((menu) => (
            <li key={menu.label}>
              <Link to="#" className={styles.mobileNavLink} onClick={() => setMenuOpen(false)}>
                {menu.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {menuOpen && <div className={styles.backdrop} onClick={() => setMenuOpen(false)} />}

      {/* 검색 오버레이 */}
      <div className={`${styles.searchOverlay} ${searchOpen ? styles.searchOverlayOpen : ""}`}>
        <button className={styles.closeBtn} onClick={() => setSearchOpen(false)} aria-label="닫기">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className={styles.searchBox}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="22" y2="22" />
          </svg>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="검색어를 입력하세요"
            autoFocus={searchOpen}
            onKeyDown={search}
          />
        </div>

        <div className={styles.searchContent}>
          <p className={styles.sectionTitle}>인기 검색어</p>
          <div className={styles.popularGrid}>
            {popularItems.map((item) => (
              <div key={item.id} className={styles.popularItem}>
                <div className={styles.popularImg}>
                  <img src={item.img} alt={item.name} onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
                <p className={styles.popularName}>{item.name}</p>
              </div>
            ))}
          </div>

          <div className={styles.recentHeader}>
            <p className={styles.sectionTitle}>
              최근 본 제품<sup>{recentItems.length > 0 ? recentItems.length : ""}</sup>
            </p>
            {recentItems.length > 0 && (
              <button className={styles.deleteBtn} onClick={clearRecent}>삭제하기</button>
            )}
          </div>

          {recentItems.length > 0 ? (
            <div className={styles.recentGrid}>
              {recentItems.map((item) => (
                <div key={item.id} className={styles.recentItem}>
                  <div className={styles.recentImg}>
                    <img src={item.img} alt={item.name} onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                  <p className={styles.recentName}>{item.name}</p>
                  <p className={styles.recentPrice}>₩{item.price?.toLocaleString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyText}>기록 없음</p>
          )}
        </div>
      </div>

      {searchOpen && <div className={styles.backdrop} onClick={() => setSearchOpen(false)} />}
      {userMenuOpen && <div className={styles.backdrop} onClick={() => setUserMenuOpen(false)} />}
    </>
  );
};

export default Header;
