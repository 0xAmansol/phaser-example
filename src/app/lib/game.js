import Phaser from "phaser";

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.tilemapTiledJSON("map", "/assets/map1.tmj");
    this.load.image("tileset1", "/assets/roomBuilderTileset.png");
    this.load.image("tileset2", "/assets/OfficeInteriors.png");
    this.load.atlas("player", "/assets/fauna.png", "/assets/fauna.json");
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset1 = map.addTilesetImage("RoomBuilder", "tileset1");
    const tileset2 = map.addTilesetImage("office-interiors", "tileset2");

    map.createLayer("Corners", tileset1, 0, 0);
    map.createLayer("Objects-2", tileset2, 0, 0);
    map.createLayer("Objects", tileset2, 0, 0);
    const interiorLayer = map.createLayer("Interiors", tileset2, 0, 0);
    interiorLayer.renderDebug(this.add.graphics());
    map.createLayer("Walls", tileset1, 0, 0);
    map.createLayer("Objects-behind-walls", tileset2, 0, 0);
    map.createLayer("Ground", tileset1, 0, 0);

    const player = this.add.sprite(200, 200, "player", "walk-down-3.png");
    this.cameras.main.scrollY -= 200;

    this.anims.create({
      key: "player-idle-down",
      frames: [{ key: "player", frame: "walk-down-3.png" }],
    });

    this.anims.create({
      key: "player-run-down",
      frames: this.anims.generateFrameNames("player", {
        start: 1,
        end: 8,
        prefix: "run-down-",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 15,
    });

    player.anims.play("player-run-down");

    this.cursors = this.input.keyboard.createCursorKeys();
  }
  // update() {
  //   const speed = 200;
  //   player.setVelocityY(0);

  //   if (this.cursors.left.isDown) {
  //     this.player.setVelocityX(-speed);
  //     this.player.anims.play("player-run-down", true);
  //   }
  // }
}

const createGame = () => {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 1000,
    height: 1000,
    scene: GameScene,
    parent: "phaser-container",
  });
};

export default createGame;
