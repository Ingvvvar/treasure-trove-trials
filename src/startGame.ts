import { Application, Texture } from 'pixi.js';
import { PlayButton } from './playButton';
import { Chest } from './chest';
import { GameManager } from './gameManager';

export function startGame() {
  const app = new Application({
    view: document.getElementById("canvas") as HTMLCanvasElement,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    antialias: true,
    backgroundColor: 0x6495ed,
    width: window.innerWidth,
    height: window.innerHeight
  });

  (globalThis as any).__PIXI_APP__ = app;

  app.loader
    .add('assets', 'assets.json')
    .add('drags', 'drags.json')
    .load(() => {
      const enabled = Texture.from('play_button_enabled.png');
      const disabled = Texture.from('play_button_disabled.png');
      const playButton = new PlayButton(enabled, disabled);

      playButton.sprite.anchor.set(0.5, 1)
      playButton.sprite.x = app.screen.width / 2;
      playButton.sprite.y = app.screen.height - playButton.sprite.height;

      const chestTexture = Texture.from('chest_closed.png');
      const chests: Chest[] = [];
      const chestsPerRow = 3;
      const gap = 40;

      const totalWidth = chestsPerRow * chestTexture.width * 0.2 + (chestsPerRow - 1) * gap;
      const totalHeight = 2 * chestTexture.height * 0.2 + gap;
      const startX = (app.screen.width - totalWidth) / 2 + 70;
      const startY = (app.screen.height - totalHeight) / 2;

      for (let i = 0; i < 6; i++) {
        const chest = new Chest(chestTexture);
        chest.sprite.scale.set(0.2);
        chest.sprite.anchor.set(0.5, 0.5);

        const row = Math.floor(i / chestsPerRow);
        const col = i % chestsPerRow;

        chest.sprite.x = startX + col * (chest.sprite.width + gap);
        chest.sprite.y = startY + row * (chest.sprite.height + gap);

        chests.push(chest);
      }

      const gameManager = new GameManager(app, playButton, chests);
      gameManager.setup();
    });
}
