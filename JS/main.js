window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const logo = document.getElementById('logo');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const bar1 = document.querySelector('.hamburger .bar1');
    const bar2 = document.querySelector('.hamburger .bar2');
    const bar3 = document.querySelector('.hamburger .bar3');
    const nav = document.querySelector('.nav');  // .nav.active 요소
    const activeLink = document.querySelector('.nav-link.active');  // 현재 활성화된 메뉴 항목

    const isMobile = window.innerWidth <= 1005;

    // 스크롤 위치가 10px 이하일 때
    if (window.scrollY < 10) { 
        // 헤더와 메뉴 스타일 변경 (기본값)
        header.style.backgroundColor = '#323232'; // 헤더 배경색
        logo.src = 'img/logo.png'; // 원래 로고 이미지
         
        if (isMobile) {
            nav.style.backgroundColor = '#323232';
        }
        else{}

        navLinks.forEach(link => {
            if (link !== activeLink) {
                link.style.color = '#fff'; // 기본 글자 색상
            }
        });

        // 햄버거 아이콘의 윤곽선 기본 (투명)
        if (bar1 && bar2 && bar3) {
            bar1.style.borderColor = 'transparent';
            bar2.style.borderColor = 'transparent';
            bar3.style.borderColor = 'transparent';
        }

    } else {  // 스크롤 위치가 10px 이상일 때
        // 헤더와 메뉴 스타일 변경 (스크롤 시)
        header.style.backgroundColor = '#fff'; // 헤더 배경색 변경
        logo.src = 'img/logo-dark.png'; // 변경된 로고 이미지
        
        if (isMobile) {
            nav.style.backgroundColor = '#fff';
        }
        else{}

        navLinks.forEach(link => {
            if (link !== activeLink) {
                link.style.color = '#000'; // 글자 색상을 검정색으로 변경
            }
        });

        // 햄버거 아이콘의 윤곽선 색상 변경 (검은색)
        if (bar1 && bar2 && bar3) {
            bar1.style.borderColor = '#000';
            bar2.style.borderColor = '#000';
            bar3.style.borderColor = '#000';
        }
    }
});

function toggleMenu() {
    const nav = document.querySelector('.nav');
    const hamburger = document.querySelector('.hamburger');
    nav.classList.toggle('active');
    hamburger.classList.toggle('rotated'); // 클릭 시 회전 클래스 토글
}
