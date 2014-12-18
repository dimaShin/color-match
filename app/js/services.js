/**
 * Created by iashind on 16.12.14.
 */
define(['app', 'Services/RulesService', 'Entities/Game', 'Entities/Tile'], function(app, RulesService, GameEntityService, TileEntityService){
    console.log('services');
    app.factory('rules', RulesService)
        .factory('GameEntityService', GameEntityService)
        .factory('TileEntityService', TileEntityService);

})