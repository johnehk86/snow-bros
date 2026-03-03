const AD_URL = 'https://aicraftlog.com';
const AD_INTERSTITIAL_INTERVAL = 3; // Show interstitial every N stages

export class AdManager {
    constructor() {
        this.stagesSinceAd = 0;
        this.createBannerAd();
        this.createInterstitialAd();
    }

    // --- Bottom banner (always visible) ---
    createBannerAd() {
        const banner = document.createElement('a');
        banner.id = 'ad-banner';
        banner.href = AD_URL;
        banner.target = '_blank';
        banner.rel = 'noopener';
        banner.innerHTML = `
            <span class="ad-icon">🎮</span>
            <span class="ad-text">
                <strong>aicraftlog.com</strong>
                <span>더 재미있는 AI 창작 게임들이 가득!</span>
            </span>
            <span class="ad-cta">방문하기 →</span>
        `;
        document.getElementById('game-container').appendChild(banner);
    }

    // --- Interstitial overlay (between stages) ---
    createInterstitialAd() {
        const overlay = document.createElement('div');
        overlay.id = 'ad-interstitial';
        overlay.innerHTML = `
            <div class="ad-interstitial-content">
                <div class="ad-interstitial-badge">AD</div>
                <div class="ad-interstitial-title">🎮 AI가 만든 게임, 더 있습니다!</div>
                <div class="ad-interstitial-desc">
                    AI로 제작된 다양한 창작 게임과 콘텐츠를<br>
                    <strong>aicraftlog.com</strong>에서 즐겨보세요!
                </div>
                <a class="ad-interstitial-btn" href="${AD_URL}" target="_blank" rel="noopener">
                    aicraftlog.com 방문하기
                </a>
                <button class="ad-interstitial-skip" id="ad-skip-btn">
                    게임 계속하기
                </button>
            </div>
        `;
        document.body.appendChild(overlay);

        document.getElementById('ad-skip-btn').addEventListener('click', () => {
            this.hideInterstitial();
        });

        // Also allow clicking the dark background to dismiss
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.hideInterstitial();
            }
        });
    }

    showInterstitial() {
        const el = document.getElementById('ad-interstitial');
        if (el) {
            el.classList.add('visible');
        }
    }

    hideInterstitial() {
        const el = document.getElementById('ad-interstitial');
        if (el) {
            el.classList.remove('visible');
        }
        if (this._onClose) {
            this._onClose();
            this._onClose = null;
        }
    }

    isInterstitialVisible() {
        const el = document.getElementById('ad-interstitial');
        return el && el.classList.contains('visible');
    }

    /**
     * Call this when a stage is cleared.
     * Returns true if an interstitial is shown (game should wait).
     * onClose callback is called when the ad is dismissed.
     */
    onStageClear(onClose) {
        this.stagesSinceAd++;
        if (this.stagesSinceAd >= AD_INTERSTITIAL_INTERVAL) {
            this.stagesSinceAd = 0;
            this._onClose = onClose;
            this.showInterstitial();
            return true;
        }
        return false;
    }
}
