import { Directive, Input, HostBinding, OnInit } from '@angular/core';

import { ImageBuffer } from '@app/core';

@Directive({
  selector: '[binaryToImage]',
})
export class BinaryToImageDirective implements OnInit {
  @HostBinding('src')
  @Input()
  src: string | ImageBuffer;

  ngOnInit() {
    if (this.isImageBuffer(this.src)) {
      const { buffer, contentType } = this.extract(this.src);
      const encoded = btoa(
        buffer.reduce((memo, code) => memo + String.fromCharCode(code), '')
      );

      this.src = `data:${contentType};base64,${encoded}`;
    }
  }

  private isImageBuffer(source: any): source is ImageBuffer {
    try {
      return Array.isArray(source.data.data) && source.contentType;
    } catch {
      return false;
    }
  }

  private extract(source: ImageBuffer) {
    const { data: buffer, contentType } = source;

    return { buffer: buffer.data, contentType };
  }
}
