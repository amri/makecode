controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    moveGhost()
})
controller.anyButton.onEvent(ControllerButtonEvent.Released, function () {
    moveGhost()
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.doorOpenEast, function (sprite, location) {
    levelNumber += 1
    changeLevel(levelNumber)
    if (levelNumber == 0) {
        tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 3))
    } else {
        if (levelNumber == 1) {
            tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 3))
        }
    }
})
function changeLevel (levelNumber: number) {
    if (levelNumber == 0) {
        tiles.setTilemap(tilemap`level2`)
    } else if (levelNumber == 1) {
        tiles.setTilemap(tilemap`level2`)
    }
    if (levelNumber == 2) {
        tiles.setTilemap(tilemap`level3`)
    }
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite, location) {
    tiles.setTileAt(tiles.getTileLocation(7, 3), sprites.dungeon.chestOpen)
    game.over(true, effects.confetti)
})
function moveGhost () {
    ghostLocationX = randint(1, 8)
    ghostLocationY = randint(1, 5)
    tiles.placeOnTile(ghost, tiles.getTileLocation(ghostLocationX, ghostLocationY))
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.doorOpenWest, function (sprite, location) {
    if (levelNumber == 2) {
        levelNumber += -1
        changeLevel(levelNumber)
        tiles.placeOnTile(mySprite, tiles.getTileLocation(8, 3))
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.over(false, effects.slash)
})
let ghostLocationY = 0
let ghostLocationX = 0
let ghost: Sprite = null
let mySprite: Sprite = null
let levelNumber = 0
tiles.setTilemap(tilemap`level0`)
levelNumber = 0
mySprite = sprites.create(img`
    . . 4 4 4 . . . . 4 4 4 . . . . 
    . 4 5 5 5 e . . e 5 5 5 4 . . . 
    4 5 5 5 5 5 e e 5 5 5 5 5 4 . . 
    4 5 5 4 4 5 5 5 5 4 4 5 5 4 . . 
    e 5 4 4 5 5 5 5 5 5 4 4 5 e . . 
    . e e 5 5 5 5 5 5 5 5 e e . . . 
    . . e 5 f 5 5 5 5 f 5 e . . . . 
    . . f 5 5 5 4 4 5 5 5 f . . f f 
    . . f 4 5 5 f f 5 5 6 f . f 5 f 
    . . . f 6 6 6 6 6 6 4 4 f 5 5 f 
    . . . f 4 5 5 5 5 5 5 4 4 5 f . 
    . . . f 5 5 5 5 5 4 5 5 f f . . 
    . . . f 5 f f f 5 f f 5 f . . . 
    . . . f f . . f f . . f f . . . 
    `, SpriteKind.Player)
ghost = sprites.create(assets.image`ghost`, SpriteKind.Enemy)
ghostLocationX = 1
ghostLocationY = 1
tiles.placeOnTile(ghost, tiles.getTileLocation(ghostLocationX, ghostLocationY))
tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 3))
controller.moveSprite(mySprite, 20, 20)
scene.cameraFollowSprite(mySprite)
