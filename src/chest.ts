import { Sprite, Texture } from "pixi.js";

export class Chest {
  sprite: Sprite;
  type: "regular" | "bonus" | "lose";
  isOpen: boolean;

  constructor(textureClosed: Texture) {
    this.sprite = new Sprite(textureClosed);
    this.type = "lose";
    this.isOpen = false;
  }

  open(textureRegular: Texture, textureBonus: Texture, textureLose: Texture) {
    if (this.type === "regular") {
      this.sprite.texture = textureRegular;
    } else if (this.type === "bonus") {
      this.sprite.texture = textureBonus;
    } else {
      this.sprite.texture = textureLose;
    }
    
    this.isOpen = true;
  }

  setRandomType() {
    const random = Math.random();
    if (random < 0.05) {
      this.type = "bonus";
    } else if (random < 0.55) {
      this.type = "regular";
    } else {
      this.type = "lose";
    }
  }
}