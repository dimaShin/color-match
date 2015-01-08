define(['react'], function(React){

    var numbersCache = {},
        positionsCache = {
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
        };

    function getFontSize(colorN, side){
        var baseSize, measurementUnits;
        if(window.innerWidth > 800){
            baseSize = 600 / side * .75;
            measurementUnits = 'px';
        }else{
            baseSize = 70 / side;
            measurementUnits = 'vw';
        }

        if(colorN < 3) return baseSize + measurementUnits;
        if(colorN < 6) return baseSize * .8 + measurementUnits;
        if(colorN < 9) return baseSize * .55 + measurementUnits;
        if(colorN < 13) return baseSize * .4 + measurementUnits;
        if(colorN >= 13) return baseSize * .3 + measurementUnits;
    }

    return React.createClass({
        propTypes: {
            list: React.PropTypes.array.isRequired
        },

        render: function() {
            var scope = this.props.scope, innerHtml, innerStyle,
                list = this.props.list,
                difficulty = scope.difficulty,
                numbers = scope.numbers,
                animationState = scope.animation,
                classes = React.addons.classSet({
                    easy: difficulty === 'easy',
                    normal: difficulty === 'normal',
                    hard: difficulty === 'hard',
                    tile: true,
                    animate: animationState === 'ON'
                }),
                tileSize = scope.rules.getTileSize(),
                tiles = _.map(list, function(tile) {
                    var index = tile.index,
                        x = scope.utils.getPos(index).x,
                        y = scope.utils.getPos(index).y;

                    if(!positionsCache[difficulty].x[x]){
                        positionsCache[difficulty].x[x] = tileSize*x + (x*2)+1 + '%';
                    }
                    if(!positionsCache[difficulty].y[y]){
                        positionsCache[difficulty].y[y] = tileSize*y + (y*2)+1 + '%';
                    }

                    var tileStyle = {
                        backgroundColor: tile.color,
                        left: positionsCache[difficulty].y[y],
                        top: positionsCache[difficulty].x[x],
                        fontSize: getFontSize(tile.colorN, scope.rules.getSize())
                    };
                    if(numbers === 'ON'){
                        if(!numbersCache[tile.colorN + 1]) numbersCache[tile.colorN + 1] = Math.pow(2, tile.colorN + 1);
                        innerHtml = numbersCache[tile.colorN + 1]
                    }else{
                        innerStyle = {
                            backgroundColor: tile.getNextColor()
                        };
                        innerHtml = <div className="next-tile" style={innerStyle}></div>
                    }

                    return <div key={tile.count} className={classes} style={tileStyle}>{innerHtml}</div>;
                }),
                containerClassString = 'tiles-container ' + difficulty;

            return (
                <div className={containerClassString}>
                    {tiles}
                </div>
            );
        }
    });
})