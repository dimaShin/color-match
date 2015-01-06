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

    function setFontSize(height, colorN){
        if(colorN < 3) return height * .9 + 'px';
        if(colorN < 6) return height * .7 + 'px';
        if(colorN < 9) return height * .45 + 'px';
        if(colorN < 12) return height * .25 + 'px';
    }

    return React.createClass({
        propTypes: {
            list: React.PropTypes.array.isRequired
        },

        render: function() {
            console.log(this.props);


            var scope = this.props.scope,
                list = this.props.list,
                difficulty = scope.difficulty,
                numbers = scope.numbers,
                classSet = React.addons.classSet,
                classes = classSet({
                    easy: difficulty === 'easy',
                    normal: difficulty === 'normal',
                    hard: difficulty === 'hard',
                    tile: true,
                    animate: true
                }),
                tileSize = scope.rules.getTileSize(),
                tiles = _.map(list, function(tile) {
                    var index = (tile === 'number') ? tile : tile.index,
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
                        top: positionsCache[difficulty].x[x]
                    };
                    console.log('tile: ', tileSize, scope);
                    return <div key={tile.count} className={classes} style={tileStyle}>{tile.index}</div>;
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