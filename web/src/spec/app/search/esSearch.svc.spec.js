describe('elasticCluster', function () {

    beforeEach(module('app'));

    var $controller;
    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    var factory = null;
    beforeEach(inject(function (elasticCluster) {
        factory = elasticCluster;
    }))

    it('should define esClient', inject(function (elasticCluster) {
        expect(factory.esClient).toBeDefined()
    }))

});
