import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topRow}>
        <ul className={styles.navList}>
          <li><a href="#">문의하기</a></li>
          <li><a href="#">고객 서비스</a></li>
          <li><a href="#">스토어 찾기</a></li>
          <li><a href="#">법적 고지</a></li>
          <li className={styles.bold}><a href="#">개인정보 처리방침</a></li>
          <li><a href="#">구독하기</a></li>
          <li><a href="#">소셜</a></li>
          <li className={styles.underline}><a href="#">국가: South Korea</a></li>
        </ul>
        <span className={styles.copyright}>© 2026 GENTLE MONSTER</span>
      </div>
      <div className={styles.bottomRow}>
        <p>
          주) 아이아이컴바인드 | 대표자명: 김국 | 사업자번호: 119-86-38589 | 통신판매신고번호: 제 2014-서울마포-1050호
          (<a href="#">사업자 정보 확인↗</a>) | 이메일 문의: <a href="mailto:service.kr@gentlemonster.com">service.kr@gentlemonster.com</a>
          {' '}| 개인정보보호&amp;책임자: 정태호 | 주소: 서울특별시 성동구 뚝섬로 433 | 대표번호: 1600-2126
        </p>
        <p>
          고객님의 안전한 현금자산 거래를 위해 하나은행과 재무지급보증계약을 체결하여 보장해드리고 있습니다. 서비스 가입 여부 확인↗ 고령형 영상 정보 처리기기 운영 및 관리↗
        </p>
      </div>
    </footer>
  )
}

export default Footer
