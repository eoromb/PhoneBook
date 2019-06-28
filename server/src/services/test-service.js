module.exports = (function() {
    const TestService = function(testRepository) {
        this.testRepository = testRepository;
    };
    TestService.prototype.resetDatabase = async function() {
        return this.testRepository.resetDatabase();
    };
    return TestService;
})();