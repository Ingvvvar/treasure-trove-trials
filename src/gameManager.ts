import { Application, Texture, Text, Sprite, AnimatedSprite } from 'pixi.js';
import { PlayButton } from './playButton';
import { Chest } from './chest';

export class GameManager {
  app: Application;
  playButton: PlayButton;
  chests: Chest[];

  constructor(app: Application, playButton: PlayButton, chests: Chest[]) {
    this.app = app;
    this.playButton = playButton;
    this.chests = chests;
  }

  setup() {
    this.app.stage.addChild(this.playButton.sprite);
    this.chests.forEach(chest => this.app.stage.addChild(chest.sprite));

    this.playButton.sprite.on('pointerdown', () => this.onPlayButtonClicked());
    this.chests.forEach(chest => {
      chest.sprite.on('pointerdown', () => this.onChestClicked(chest));
      chest.sprite.interactive = false;
      chest.sprite.buttonMode = true;
    });

    this.resetGame();
  }

  resetGame() {
    this.chests.forEach(chest => {
      chest.setRandomType();
      chest.sprite.texture = Texture.from('chest_closed.png');
      chest.isOpen = false;
      chest.sprite.interactive = false;
    });
    this.playButton.toggle(true);
  }

  onChestClicked(chest: Chest) {
    if (!chest.isOpen && !this.playButton.isEnabled) {
      const textureRegular = Texture.from('chest_regular_win.png');
      const textureBonus = Texture.from('chest_bonus_win.png');
      const textureLose = Texture.from('chest_lose.png');
      chest.open(textureRegular, textureBonus, textureLose);
      this.playButton.toggle(false);

      if (chest.type === 'bonus') {
        this.redirectToBonusScreen();
        this.checkAllChestsOpened();
      } else {
        this.checkAllChestsOpened();
      }
    }
  }

  onPlayButtonClicked() {
    this.resetGame();
    if (this.playButton.isEnabled) {
      this.playButton.toggle(false);
      this.playButton.sprite.interactive = false;
      this.chests.forEach(chest => {
        chest.sprite.interactive = true;
      });
    }
  }

  redirectToBonusScreen() {
    console.log('bonuus!!!')
    this.showBonusScreen();
  }

  showBonusScreen() {
    const background = new Sprite(Texture.from('bonus_screen_background.png'));
    this.app.stage.addChild(background);

    const dragonFrames = [];
    for (let i = 1; i <= 12; i++) {
      dragonFrames.push(Texture.from(`drag${i}.png`));
    }
    const dragon = new AnimatedSprite(dragonFrames);
    dragon.x = this.app.screen.width / 2;
    dragon.y = dragon.height / 4;
    dragon.scale.set(1.5);
    dragon.anchor.set(0.5, 0);
    dragon.animationSpeed = 0.1;
    dragon.play();
    this.app.stage.addChild(dragon);

    const bonusText = new Text('Bonus Win!', {
      fontSize: 48,
      fill: '#000',
    });
    bonusText.position.set(this.app.screen.width / 2 - bonusText.width / 2, this.app.screen.height / 2 - bonusText.height / 2);
    this.app.stage.addChild(bonusText);

    const winningAmount = Math.floor(Math.random() * 100) + 1;
    const winningText = new Text(`You won: ${winningAmount}`, {
      fontSize: 36,
      fill: '#000',
    });
    winningText.position.set(this.app.screen.width / 2 - winningText.width / 2, this.app.screen.height / 2 - winningText.height / 2 + 60);
    this.app.stage.addChild(winningText);

    setTimeout(() => {
      this.app.stage.removeChild(background);
      this.app.stage.removeChild(dragon);
      this.app.stage.removeChild(bonusText);
      this.app.stage.removeChild(winningText);
    }, 5000);
  }

  checkAllChestsOpened() {
    const allChestsOpened = this.chests.every(chest => chest.isOpen);
    if (allChestsOpened) {
      this.playButton.toggle(true);
      this.playButton.sprite.interactive = true;
    }
  }
}
