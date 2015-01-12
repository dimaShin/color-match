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
            delay = 100,
            stage = new createjs.Stage("tilesBox"),
            pxPerPercent = 596 / 100,
            tileShadow = new createjs.Shadow("#000000", 0, 0, 10);

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
                tileViews[tile.count].shadow = tileShadow;
                stage.addChild(tileViews[tile.count]);
                createjs.Tween.get(tileViews[tile.count]).to({alpha: 1}, delay/2, createjs.Ease.getPowInOut(4));
                console.log(tileViews[tile.count])
            },
            showMove: function showMove(tilesCollection){
                var i, length = tilesCollection.length,
                    tile, index, oldIndex, oldX, oldY, x, y, count,
                    difficulty = rules.getDiffName(),
                    tileSize = rules.getTileSize();
                for(i = 0; i < length; i++){
                    tile = tilesCollection[i];
                    if(tile.absorbed){
                        (function removeAbsorbed(count) {
                            setTimeout(function(){
                                stage.removeChild(tileViews[count]);
                            },delay)
                        })(tile.count)
                    }
                    index = tile.index;
                    oldIndex = tile.oldIndex;
                    oldX = utils.getPos(oldIndex).x;
                    oldY = utils.getPos(oldIndex).y;
                    x = utils.getPos(index).x;
                    y = utils.getPos(index).y;
                    count = tile.count;
                    if(oldX !== x){
                        if(!positionsCache[difficulty].x[x]){
                            positionsCache[difficulty].x[x] = (tileSize*x + (x*2)+1)*pxPerPercent;
                        }
                        createjs.Tween.get(tileViews[count]).to({y: positionsCache[difficulty].x[x]}, delay, createjs.Ease.getPowInOut(4));
                    }else if(oldY !== y){
                        if(!positionsCache[difficulty].y[y]){
                            positionsCache[difficulty].y[y] = (tileSize*y + (y*2)+1)*pxPerPercent;
                        }
                        createjs.Tween.get(tileViews[count]).to({x: positionsCache[difficulty].y[y]}, delay, createjs.Ease.getPowInOut(4));
                    }
                    if(tile.alreadyGrows){
                        //createjs.Tween.get(tileViews[count])
                        //    .to({shadow: null}, delay/3, createjs.Ease.getPowInOut(4))
                        //    .to({shadow: tileShadow}, delay/3, createjs.Ease.getPowInOut(4));
                        (function setTileColor(tileView, color){
                            setTimeout(function(){
                                tileView.graphics._fill.style = color;
                            },delay/2)
                        })(tileViews[count], tile.color);
                    }
                    tile.oldIndex = index;
                }
            },
            clearCanvas: function clearCanvas(){
                for(var i in tileViews){
                    stage.removeChild(tileViews[i]);
                }
            },
            getDelay: function getDelay(){
                return delay;
            },
            setDelay: function setDelay(boolDelay){
                delay = boolDelay ? 100 : 0;
            }
        }
    }


    return RenderService;
})