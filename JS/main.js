window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const logo = document.getElementById('logo');
    const navLinks = document.querySelectorAll('.nav-link');

    // 현재 클릭된 메뉴를 찾아서 저장
    let activeLink = document.querySelector('.nav-link.active');

    if (window.scrollY < 10) { // 스크롤 위치가 10px 이하일 때
        header.style.backgroundColor = '#323232'; // 헤더 배경색
        logo.src = 'img/logo.png'; // 원래 로고 이미지
        navLinks.forEach(link => {
            if (link !== activeLink) {
                link.style.color = '#fff'; // 원래 글자 색상
            }
        });
        // 클릭된 메뉴의 색상 및 스타일 설정
        if (activeLink) {
            activeLink.style.color = 'transparent'; // 클릭된 메뉴 글자 색상은 투명으로 설정
            activeLink.style.background = 'linear-gradient(to right, #5FFFE9, #FCF0BA)'; // 그라데이션 배경
            activeLink.style.backgroundClip = 'text'; // 배경을 텍스트에 적용
            activeLink.style.pointerEvents = 'none'; // 클릭 방지
        }
    } else {
        header.style.backgroundColor = '#fff'; // 원래 배경색
        logo.src = 'img/logo-dark.png'; // 변경할 로고 이미지
        navLinks.forEach(link => {
            if (link !== activeLink) {
                link.style.color = '#000'; // 글자 색상을 검정색으로 변경
            }
        });
        // 클릭된 메뉴의 색상은 유지
        if (activeLink) {
            activeLink.style.color = 'transparent'; // 클릭된 메뉴 글자 색상은 투명으로 유지
            activeLink.style.background = 'linear-gradient(to right, #5FFFE9, #FCF0BA)'; // 그라데이션 배경 유지
            activeLink.style.backgroundClip = 'text'; // 배경을 텍스트에 적용
            activeLink.style.pointerEvents = 'none'; // 클릭 방지
        }
    }
});