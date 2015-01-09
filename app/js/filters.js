/**
 * Created by iashind on 23.12.14.
 */
define(['app',
    'Filters/RangeFilter',
    'Filters/ScoreFilter'
], function(app, RangeFilter, ScoreFilter){
    app.filter('range', RangeFilter)
        .filter('score', ScoreFilter);

})