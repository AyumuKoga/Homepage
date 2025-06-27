// =============================
// DOMContentLoaded
// =============================
document.addEventListener('DOMContentLoaded', function() {
    // ローディング画面
    const loadingScreen = document.getElementById('loading-screen');
    function hideLoading() {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => { loadingScreen.style.display = 'none'; }, 500);
        }
    }
    window.addEventListener('load', hideLoading);
    setTimeout(hideLoading, 3000);

    // ハンバーガーメニュー
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('is-active');
            navMenu.classList.toggle('active');
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('is-active');
                navMenu.classList.remove('active');
            });
        });
    }

    // スクロールでヘッダー影
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 40) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    // スムーズスクロール
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            if (href.length > 1 && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // トップに戻るボタン
    const toTopBtn = document.getElementById('toTopBtn');
    if (toTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                toTopBtn.style.display = 'block';
            } else {
                toTopBtn.style.display = 'none';
            }
        });
        toTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ページ遷移アニメーション
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('page-transition');
        setTimeout(() => { mainContent.classList.add('loaded'); }, 100);
    }

    // フォームの送信制御
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // 送信ボタンを無効化（二重送信防止）
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = '送信中...';
            }
        });
    });

    // 画像の遅延読み込み
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // アクセシビリティの改善
    // キーボードナビゲーション
    document.addEventListener('keydown', function(e) {
        // ESCキーでメニューを閉じる
        if (e.key === 'Escape') {
            if (menuToggle && navMenu) {
                menuToggle.classList.remove('is-active');
                navMenu.classList.remove('active');
            }
        }
    });

    // フォーカス管理
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    // モーダルやメニューが開いている時のフォーカス制御
    function trapFocus(element) {
        const focusableContent = element.querySelectorAll(focusableElements);
        const firstFocusableElement = focusableContent[0];
        const lastFocusableElement = focusableContent[focusableContent.length - 1];

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    // パフォーマンス最適化
    // スクロールイベントの最適化
    let ticking = false;
    
    function updateOnScroll() {
        handleScroll();
        toggleBackToTop();
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);

    // エラーハンドリング
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // エラーが発生してもユーザー体験を損なわないよう処理
    });

    // ページの可視性変更時の処理
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // ページが非表示になった時の処理
            console.log('Page hidden');
        } else {
            // ページが表示された時の処理
            console.log('Page visible');
        }
    });

    // フェードインアニメーション
    const fadeEls = document.querySelectorAll('.fadein, .card, .access-card, .index-card, .staff-card, .insurance-card, .news-item');
    const fadeInOnScroll = () => {
        fadeEls.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                el.style.opacity = 1;
                el.style.transform = 'none';
                el.style.transition = 'opacity 0.7s, transform 0.7s';
            }
        });
    };
    window.addEventListener('scroll', fadeInOnScroll);
    window.addEventListener('load', fadeInOnScroll);
});

// グローバル関数（他のスクリプトから呼び出し可能）
window.TzAuto = {
    // ページ遷移
    navigateTo: function(url) {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
            loadingScreen.classList.remove('hidden');
        }
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    },
    
    // ローディング画面の表示
    showLoading: function() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
            loadingScreen.classList.remove('hidden');
        }
    },
    
    // ローディング画面の非表示
    hideLoading: function() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }
};