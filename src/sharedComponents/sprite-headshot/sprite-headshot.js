import { LitElement, html, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

import { SPRITE_ENCYCLOPEDIA } from '../../models/Sprite/spriteEncyclopedia';

const SPRITE_SIZE = 350;

export default class SpriteHeadshot extends LitElement {
  static get properties() {
    return {
      sprite: { type: Object },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
        overflow: hidden;
        border-radius: 50%;
        width: 100px;
        height: 100px;
        max-width: 100%;
        max-height: 100%;
      }

      img {
        position: absolute;
        max-width: none;
      }
    `;
  }

  render() {
    const { headshotPosition } = SPRITE_ENCYCLOPEDIA[this.sprite.species];
    const sizeMultiplier = 100 / headshotPosition.size;
    const imageSizePercent = sizeMultiplier * SPRITE_SIZE;

    const imageStyles = styleMap({
      height: `${imageSizePercent}%`,
      width: `${imageSizePercent}%`,
      top: `${sizeMultiplier * -headshotPosition.top}%`,
      left: `${sizeMultiplier * -headshotPosition.left}%`,
    });

    return html`
      <img
        style=${imageStyles}
        src=${`img/sprites/${this.sprite.species}/${this.sprite.color}.png`}
        alt=${this.sprite.name}
        title=${this.sprite.name}
      />
    `;
  }
}

customElements.define('sprite-headshot', SpriteHeadshot);
