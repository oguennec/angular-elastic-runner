describe('esSearchSvc', function () {

    beforeEach(module('app'));

    var $controller;
    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    var factory = null;
    beforeEach(inject(function (esSearchSvc) {
        factory = esSearchSvc;
    }))

    it('should define esClient', inject(function (esSearchSvc) {
        expect(factory.esClient).toBeDefined()
    }))

});
