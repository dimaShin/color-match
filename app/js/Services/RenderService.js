/**
 * Created by iashind on 08.01.15.
 */
define(['easelJs'], function(){
    function RenderService(rules, utils){
        var positionsCache = {
            hard: {
                x: {},
                y: {}
            },
            normal: {
                x: {},
                y: {}
            },
            easy: {
                x: {},
                y: {}
            }
        },
            tileViews = {},
            stage = new createjs.Stage("tilesBox"),
            pxPerPercent = 596 / 100;
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", stage);

        return{
            showTile: function showTile(tile){
                var tileSize = rules.getTileSize(),
                    difficulty = rules.getDiffName(),
                    index = tile.index,
                    x = utils.getPos(index).x,
                    y = utils.getPos(index).y,
                    sidePx = tileSize*pxPerPercent,
                    radius = sidePx / 10;

                if(!positionsCache[difficulty].x[x]){
                    positionsCache[difficulty].x[x] = (tileSize*x + (x*2)+1)*pxPerPercent;
                }
                if(!positionsCache[difficulty].y[y]){
                    positionsCache[difficulty].y[y] =(tileSize*y + (y*2)+1)*pxPerPercent;
                }
                tileViews[tile.count] = new createjs.Shape();
                tileViews[tile.count].graphics.beginFill(tile.color).drawRoundRect(0, 0, sidePx, sidePx, radius);
                tileViews[tile.count].y = positionsCache[difficulty].x[x];
                tileViews[tile.count].x = positionsCache[difficulty].y[y];
                tileViews[tile.count].alpha = 0;
                stage.addChild(tileViews[tile.count]);
                createjs.Tween.get(tileViews[tile.count]).to({alpha: 1}, 300, createjs.Ease.getPowInOut(4));

                console.log('set tile: ', tile.index);
            },
            showMove: function showMove(tilesCollection){
                console.log('start moving: ', tilesCollection);
                var i, length = tilesCollection.length,
                    tile, index, oldIndex, oldX, oldY, x, y, count,
                    difficulty = rules.getDiffName(),
                    tileSize = rules.getTileSize();
                for(i = 0; i < length; i++){
                    tile = tilesCollection[i];
                    if(tile.absorbed){
                        console.log('found absorbed: ', tile.index, tile.oldIndex);
                        (function(count) {setTimeout(function(){
                            console.log('removing child: ', count)
                            stage.removeChild(tileViews[count]);
                        },300)})(tile.count)
                    }
                    console.log('got tile at ', tile.oldIndex, tile.index);
                    index = tile.index;
                    oldIndex = tile.oldIndex;
                    oldX = utils.getPos(oldIndex).x;
                    oldY = utils.getPos(oldIndex).y;
                    x = utils.getPos(index).x;
                    y = utils.getPos(index).y;
                    count = tile.count;
                    console.log('moving tile: ', oldIndex, ' to ', index);
                    if(oldX !== x){
                        if(!positionsCache[difficulty].x[x]){
                            positionsCache[difficulty].x[x] = (tileSize*x + (x*2)+1)*pxPerPercent;
                        }
                        createjs.Tween.get(tileViews[count]).to({y: positionsCache[difficulty].x[x]}, 300, createjs.Ease.getPowInOut(4));
                    }else if(oldY !== y){
                        if(!positionsCache[difficulty].y[y]){
                            positionsCache[difficulty].y[y] = (tileSize*y + (y*2)+1)*pxPerPercent;
                        }
                        createjs.Tween.get(tileViews[count]).to({x: positionsCache[difficulty].y[y]}, 300, createjs.Ease.getPowInOut(4));
                    }
                    if(tile.alreadyGrows){
                        console.log('growsUp');
                        createjs.Tween.get(tileViews[count]).to({width: +10, heigth: +10}, 100, createjs.Ease.getPowInOut(4))
                            .to({width: -10, heigth: -10}, 100, createjs.Ease.getPowInOut(4))
                    }
                    (function(tileView, color){
                        setTimeout(function(){
                            tileView.graphics._fill.style = color;
                        },200)
                    })(tileViews[count], tile.color);
                    tile.oldIndex = index;
                }
            },
            clearCanvas: function clearCanvas(){
                for(var i in tileViews){
                    stage.removeChild(tileViews[i]);
                }
            }
        }
    }


    return RenderService;
})