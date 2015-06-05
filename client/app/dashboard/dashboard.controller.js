'use strict';

angular.module('docManApp')
  .controller('DashboardCtrl', function ($scope, $modal, $log) {
    var vm = this;

    var dateFormat = "MMM Do YY, h:mm a";

    vm.selectedCount = 0;

    var myData = [
      {
        "name": "myDoc.doc",
        "owner" : {
          "name" : "Admin",
          "id" : 123
        },
        "uploaded" : moment().format(dateFormat),
        "modified" : moment().format(dateFormat),
        "shared" : [{
          "name" : "Joe",
          "id" : 124
        },{
          "name" : "Shelly",
          "id" : 125
        }]
      },
      {
        "name": "slideshow.ppt",
        "owner" : {
          "name" : "Admin",
          "id" : 123
        },
        "uploaded" : moment().format(dateFormat),
        "modified" : moment().format(dateFormat),
        "shared" : [{
          "name" : "Joe",
          "id" : 124
        }]
      },
      {
        "name": "proposal.doc",
        "owner" : {
          "name" : "Shelly",
          "id" : 125
        },
        "uploaded" : moment().format(dateFormat),
        "modified" : moment().format(dateFormat),
        "shared" : [{
          "name" : "Admin",
          "id" : 123
        }]
      }
    ];

    vm.add = function () {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'components/addModal/addModal.html',
        controller: 'AddModalCtrl',
        size: 'sm'
      });

      modalInstance.result
        .then(function (docName) {
          myData.push({
            "name": docName,
            "owner" : {
              "name" : "Admin",
              "id" : 123
            },
            "uploaded" : moment().format(dateFormat),
            "modified" : moment().format(dateFormat),
            "shared" : []
          });
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
    };

    vm.edit = function () {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'components/editModal/editModal.html',
        controller: 'EditModalCtrl',
        size: 'sm',
        resolve: {
          selectedDoc: function () {
            return vm.gridApi.selection.getSelectedRows()[0];
          }
        }
      });

      modalInstance.result
        .then(function (doc) {
          $log.info('Changed name to: ' + doc.name);
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
    };

    vm.delete = function () {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'components/deleteModal/deleteModal.html',
        controller: 'DeleteModalCtrl',
        size: 'sm',
        resolve: {
          selectedDocs: function () {
            return vm.gridApi.selection.getSelectedRows();
          }
        }
      });

      modalInstance.result
        .then(function (docs) {
          $log.info('Deleted: ' + docs.length + ' documents');
          vm.gridOptions.data = myData = _.xor(myData, docs);
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
    };

    var exts = {
      'ppt' : ['ppt','pot','pps','pptx'],
      'excel' : ['xls','xlt','xlm','xlsx','xlsm','xltm'],
      'pdf' : ['pdf'],
      'audio' : ['mp3','3ga','aa','wave','wav','ram','m4a','cdfs','fls','aac'],
      'word' : ['doc','dot','docx','docm','dotx'],
      'archive' : ['zip','7z','xz','zipx','tar','gz','iso'],
      'image' : ['gif','jpeg','jpg','png','bmp'],
      'text' : ['txt','text'],
      'video' : ['mp4','mpeg','qt','flv'],
      'code' : ['json','js','css','html','cs','xml']
    };

    //maps the above to a flat obj with the key/vals inverted
    vm.mappedExts = {};
    _.transform(exts, function(acc, val, key, obj) {
      _.each(val, function(extension) {
        acc[extension] = key;
      });
    }, vm.mappedExts);

    vm.gridOptions = {
      enableSorting: true,
      showGridFooter: true,
      enableGridMenu: true,
      enableRowSelection: true,
      enableFullRowSelection: true,
      columnDefs: [
        {
          field: 'name',
          cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
            var ext = grid.getCellValue(row,col).split('.').pop().toLowerCase();
            if(vm.mappedExts[ext]) {
              return 'icon-' + vm.mappedExts[ext];
            }
            return 'icon-file';
          }
        },
        { field: 'owner.name', displayName: 'Owner' },
        { field: 'uploaded' },
        { field: 'modified' }
      ],
      data : myData,
      onRegisterApi: onRegisterApi
    };

    function onRegisterApi(gridApi) {
      //set gridApi on scope
      vm.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged(null, function(row){
        vm.selectedCount = getSelectedRowCount();

        var msg = 'row selected ' + row.isSelected;
        $log.log(msg);
      });

      gridApi.selection.on.rowSelectionChangedBatch(null, function(rows){
        vm.selectedCount = getSelectedRowCount();

        var msg = 'rows changed ' + rows.length;
        $log.log(msg);
      });
    }

    function getSelectedRowCount() {
      return vm.gridApi.grid.selection.selectedCount;
    }

    $scope.items = [
      'The first choice!',
      'And another choice for you.',
      'but wait! A third!'
    ];

    $scope.status = {
      isopen: false
    };

    $scope.toggled = function(open) {
      $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };

  });
