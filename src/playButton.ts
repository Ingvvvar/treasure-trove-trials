import { Sprite, Texture } from "pixi.js";

export class PlayButton {
  sprite: Sprite;
  isEnabled: boolean;
  textureEnabled: Texture;
  textureDisabled: Texture;

  constructor(textureEnabled: Texture, textureDisabled: Texture) {
    this.sprite = new Sprite(textureEnabled);
    this.textureEnabled = textureEnabled;
    this.textureDisabled = textureDisabled;
    this.isEnabled = true;
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
  }

  toggle(enabled: boolean) {
    this.sprite.texture = enabled ? this.textureEnabled : this.textureDisabled;
    this.isEnabled = enabled;
  }
}
