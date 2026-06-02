export interface FullscreenOptions {
  onEnter?: () => void;
  onExit?: () => void;
  preserveAspectRatio?: boolean;
}

export class FullscreenManager {
  private element: HTMLElement | null = null;
  private options: FullscreenOptions = {};
  private originalStyles: Partial<CSSStyleDeclaration> = {};

  constructor(element: HTMLElement, options: FullscreenOptions = {}) {
    this.element = element;
    this.options = { preserveAspectRatio: true, ...options };
    this.init();
  }

  private init() {
    document.addEventListener('fullscreenchange', this.handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', this.handleFullscreenChange);
  }

  private handleFullscreenChange = () => {
    const isFullscreen = this.isFullscreen();
    
    if (this.element) {
      if (isFullscreen) {
        this.applyFullscreenStyles();
        this.options.onEnter?.();
      } else {
        this.restoreOriginalStyles();
        this.options.onExit?.();
      }
    }
  };

  private saveOriginalStyles() {
    if (!this.element) return;
    
    // 只保存当前已设置的内联样式，而不是computed styles
    // 这样可以确保我们只恢复我们修改过的样式
    this.originalStyles = {
      width: this.element.style.width,
      height: this.element.style.height,
      maxWidth: this.element.style.maxWidth,
      maxHeight: this.element.style.maxHeight,
      top: this.element.style.top,
      left: this.element.style.left,
      right: this.element.style.right,
      bottom: this.element.style.bottom,
      margin: this.element.style.margin,
      borderRadius: this.element.style.borderRadius,
      display: this.element.style.display,
      alignItems: this.element.style.alignItems,
      justifyContent: this.element.style.justifyContent,
      objectFit: this.element.style.objectFit,
      position: this.element.style.position,
      zIndex: this.element.style.zIndex,
      backgroundColor: this.element.style.backgroundColor,
    };
  }

  private applyFullscreenStyles() {
    if (!this.element) return;
    
    this.saveOriginalStyles();
    
    // 应用全屏样式
    this.element.style.width = '100vw';
    this.element.style.height = '100vh';
    this.element.style.maxWidth = 'none';
    this.element.style.maxHeight = 'none';
    this.element.style.top = '0';
    this.element.style.left = '0';
    this.element.style.right = '0';
    this.element.style.bottom = '0';
    this.element.style.margin = '0';
    this.element.style.borderRadius = '0';
    this.element.style.backgroundColor = 'transparent';
    this.element.style.position = 'fixed';
    this.element.style.zIndex = '9999';
    
    // 让容器成为flex容器，内容居中
    this.element.style.display = 'flex';
    this.element.style.alignItems = 'center';
    this.element.style.justifyContent = 'center';
    
    // 查找iframe并应用全屏样式
    const iframe = this.element.querySelector('iframe');
    if (iframe) {
      // 保存iframe的原始样式
      if (!iframe.dataset.originalStyles) {
        iframe.dataset.originalStyles = JSON.stringify({
          width: iframe.style.width,
          height: iframe.style.height,
          maxWidth: iframe.style.maxWidth,
          maxHeight: iframe.style.maxHeight,
          objectFit: iframe.style.objectFit,
          transform: iframe.style.transform,
          scale: iframe.style.scale,
        });
      }
      
      // 计算最佳缩放比例
      const aspectRatio = 380 / 675; // 原始宽高比
      const screenAspectRatio = window.innerWidth / window.innerHeight;
      
      let finalWidth, finalHeight;
      
      if (screenAspectRatio > aspectRatio) {
        // 屏幕更宽，以高度为准
        finalHeight = Math.min(window.innerHeight, window.innerHeight * 0.95);
        finalWidth = finalHeight * aspectRatio;
      } else {
        // 屏幕更高，以宽度为准
        finalWidth = Math.min(window.innerWidth, window.innerWidth * 0.95);
        finalHeight = finalWidth / aspectRatio;
      }
      
      // 应用样式到iframe
      iframe.style.width = `${finalWidth}px`;
      iframe.style.height = `${finalHeight}px`;
      iframe.style.maxWidth = 'none';
      iframe.style.maxHeight = 'none';
      iframe.style.objectFit = 'fill';
      iframe.style.border = 'none';
      iframe.style.borderRadius = '0';
    }
  }

  private restoreOriginalStyles() {
    if (!this.element) return;
    
    // 恢复容器的原始样式
    Object.entries(this.originalStyles).forEach(([property, value]) => {
      if (property in this.element!.style) {
        // 如果原始值是空字符串，则移除该属性
        if (value === '' || value === null || value === undefined) {
          (this.element!.style as any)[property] = '';
          // 通过removeProperty移除
          const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
          this.element!.style.removeProperty(cssProperty);
        } else {
          (this.element!.style as any)[property] = value;
        }
      }
    });
    
    // 恢复iframe的原始样式
    const iframe = this.element.querySelector('iframe');
    if (iframe && iframe.dataset.originalStyles) {
      try {
        const originalStyles = JSON.parse(iframe.dataset.originalStyles);
        Object.entries(originalStyles).forEach(([property, value]) => {
          if (property in iframe.style) {
            if (value === '' || value === null || value === undefined) {
              (iframe.style as any)[property] = '';
              // 通过removeProperty移除
              const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
              iframe.style.removeProperty(cssProperty);
            } else {
              (iframe.style as any)[property] = value;
            }
          }
        });
        // 清除保存的样式数据
        delete iframe.dataset.originalStyles;
      } catch (error) {
        console.error('Failed to restore iframe styles:', error);
      }
    }
  }

  public async enterFullscreen(): Promise<void> {
    if (!this.element) return;
    
    try {
      if (this.element.requestFullscreen) {
        await this.element.requestFullscreen();
      } else if ((this.element as any).webkitRequestFullscreen) {
        await (this.element as any).webkitRequestFullscreen();
      } else if ((this.element as any).mozRequestFullScreen) {
        await (this.element as any).mozRequestFullScreen();
      } else if ((this.element as any).msRequestFullscreen) {
        await (this.element as any).msRequestFullscreen();
      }
    } catch (error) {
      console.error('Failed to enter fullscreen:', error);
    }
  }

  public async exitFullscreen(): Promise<void> {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        await (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen();
      }
    } catch (error) {
      console.error('Failed to exit fullscreen:', error);
    }
  }

  public isFullscreen(): boolean {
    return !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    );
  }

  public toggle(): Promise<void> {
    return this.isFullscreen() ? this.exitFullscreen() : this.enterFullscreen();
  }

  public destroy() {
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('MSFullscreenChange', this.handleFullscreenChange);
    
    if (this.isFullscreen()) {
      this.exitFullscreen();
    }
  }
} 