// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    // ローディング画面の管理
    const loadingScreen = document.getElementById('loading-screen');
    
    // ページ読み込み完了時の処理
    function hideLoadingScreen() {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    // ページが完全に読み込まれたらローディング画面を非表示
    window.addEventListener('load', hideLoadingScreen);
    
    // フォールバック: 3秒後に強制的に非表示
    setTimeout(hideLoadingScreen, 3000);

    // ヘッダーのスクロール効果
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // ヘッダーの背景変更
        if (scrollTop > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        lastScrollTop = scrollTop;
    }

    window.addEventListener('scroll', handleScroll);

    // ハンバーガーメニューの制御
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('is-active');
            navMenu.classList.toggle('active');
        });

        // メニューリンクをクリックしたらメニューを閉じる
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('is-active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ナビゲーションリンクのページ遷移制御
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 外部リンクやアンカーリンクは通常の遷移
            if (href.startsWith('http') || href.startsWith('#')) {
                return;
            }
            
            // 現在のページと同じ場合は何もしない
            if (href === window.location.pathname) {
                e.preventDefault();
                return;
            }
            
            // ページ遷移時のローディング表示
            showPageTransition(href);
        });
    });

    // ページ遷移の表示
    function showPageTransition(url) {
        // ローディング画面を表示
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
            loadingScreen.classList.remove('hidden');
        }
        
        // 少し遅延してから遷移（UX向上のため）
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    }

    // スムーズスクロール
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // トップに戻るボタン
    const backToTopButton = document.createElement('a');
    backToTopButton.href = '#';
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    backToTopButton.setAttribute('aria-label', 'トップに戻る');
    document.body.appendChild(backToTopButton);

    // スクロール位置に応じてボタンの表示/非表示
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleBackToTop);

    // トップに戻るボタンのクリックイベント
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ページ遷移アニメーション
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('page-transition');
        
        // ページ読み込み完了後にアニメーション開始
        setTimeout(() => {
            mainContent.classList.add('loaded');
        }, 100);
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