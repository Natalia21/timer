TicTacToe.controller("TimerController", [
    '$scope', '$timeout', '$filter',
    function ($scope, $timeout, $filter) {
        var storageData = localStorage.getItem('data');
        storageData = storageData ? JSON.parse(storageData) : false;
        var startDate = storageData ? storageData.startDate : Date.now();
        var endDate = storageData ? storageData.endDate : startDate;
        var timeoutId = null;

        var setClockTime = function (start, end) {
            $scope.clock = end - start; // get the current time
            $scope.clockTime = $filter('date')($scope.clock, 'mm:ss:sss');
            $scope.clockTime = $scope.clockTime.slice(0, $scope.clockTime.length - 1);
        };

        var tick = function () {
            endDate = endDate + 10;
            setClockTime(startDate, endDate);
            timeoutId = $timeout(tick, $scope.tickInterval);
            localStorage.setItem('data', JSON.stringify({
                startDate: startDate,
                endDate: endDate
            }));
        };

        var clearSnapchots = function () {
            $scope.snapshots = [];
        };

        $scope.tickInterval = 10; //ms
        $scope.isTimerRunning = JSON.parse(localStorage.getItem('isTimerRunning'));
        $scope.snapshots = localStorage.getItem('snapshots') ? JSON.parse(localStorage.getItem('snapshots')) : [];


        $scope.toogleTimer = function () {
            $scope.isTimerRunning = !$scope.isTimerRunning;
            if ($scope.isTimerRunning) {
                tick();
            } else {
                $timeout.cancel(timeoutId);
            }
            localStorage.setItem('isTimerRunning', $scope.isTimerRunning);
        };

        $scope.stopTimer = function() {
            $scope.isTimerRunning = false;
            $timeout.cancel(timeoutId);
            endDate = startDate;
            setClockTime(startDate, endDate);
            clearSnapchots();
            localStorage.setItem('isTimerRunning', false);
            localStorage.setItem('data', JSON.stringify({
                startDate: startDate,
                endDate: endDate
            }));
            localStorage.setItem('snapshots', JSON.stringify([]));
        };

        $scope.takeTimerSnapshot = function() {
            $scope.snapshots.push($scope.clockTime);
            localStorage.setItem('snapshots', JSON.stringify($scope.snapshots));
        };

        $scope.removeSnapshot = function (index) {
            $scope.snapshots.splice(index, 1);
            localStorage.setItem('snapshots', JSON.stringify($scope.snapshots));
        };

        //INIT

        if ($scope.isTimerRunning) {
            tick();
        }

        setClockTime(startDate, endDate);

        window.addEventListener('storage', function( event ) {
            switch (event.key) {
                case 'data':
                    var data = JSON.parse(event.newValue);
                    endDate = data.endDate + 10;
                    setClockTime(data.startDate, data.endDate);
                    $scope.$apply();
                    break;
                case 'isTimerRunning':
                    $scope.isTimerRunning = !$scope.isTimerRunning;
                    if (!$scope.isTimerRunning) {
                        $timeout.cancel(timeoutId);
                    }
                    break;
                case 'snapshots':
                    $scope.snapshots = JSON.parse(event.newValue);
                    $scope.$apply();
            }
        });

        localStorage.setItem('isTimerRunning', $scope.isTimerRunning);
    }
]);
