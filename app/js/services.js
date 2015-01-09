/**
 * Created by iashind on 16.12.14.
 */
define(['app', 'Services/RulesService',
    'Entities/Game',
    'Entities/Tile',
    'Services/SoundsService',
    'Services/UtilsService',
    'Services/StorageService',
    'Services/RenderService'], function(app, RulesService, GameEntityService, TileEntityService, SoundsService, UtilsService, StorageService, RenderService){
    app.factory('rules', RulesService)
        .factory('GameEntityService', GameEntityService)
        .factory('TileEntityService', TileEntityService)
        .factory('SoundsService', SoundsService)
        .factory('utils', UtilsService)
        .factory('storage', StorageService)
        .factory('renderer', RenderService)
})