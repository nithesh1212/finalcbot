(function () {
  var VIEWS = window.VIEWS = (window.VIEWS || {}),
      MODELS = window.MODELS,
      COLLECTIONS = window.COLLECTIONS,
      BaseTabs = VIEWS.BaseTabs;

  VIEWS.NewLcms = BaseTabs.extend({
    el: "#lcms-tagger",

    initialize: function () {
		BaseTabs.prototype.initialize.apply(this, arguments);
    },

    getTabs: function () {
	  return this.$("#lcms-tabs");
    },
	
	  addSubViews: function () {
    },
	
    getTabNames: function () {
      return _.map(this.$tabs.find("ul[role='tablist'] li"), function (tab) {
        return $(tab).data('tab')
      })
    },

    bindings: {

      '#lcms-tabs': {
        observe: 'activeTab',
        update: function ($el, val) {
          this.gotoTab(val);
        }
      }
    },
	
    events: {
    'click .save-artifact': 'save',
	  'click .go-details-btn': 'publish'
    },


    save: function(){

      window.lcmsErrorDialouge.dialog("open");
      $("#lcms-detail-error p").remove();

      $valid = true;
      if($("#branchselect").val() == ""){
        
        $("#lcms-detail-error").append("<p style='color:red'>Select brach is mandatory</p>");
        $valid = false;
  
      }else{

      }
      
      if($("#title").val() == "")
      {
        
        $("#lcms-detail-error").append("<p style='color:red'>Title is mandatory</p>");
        $valid = false;
        
      }else{
        
      }

      if( $("#description").val() == "")
      {
        
        $("#lcms-detail-error").append("<p style='color:red'>Description is mandatory</p>");
        $valid = false;
        
      }else{
        
      }

      if( $("input[name='language']:checked").val() == undefined)
      {
        
        $("#lcms-detail-error").append("<p style='color:red'>languages is mandatory</p>");
        $valid = false;
        
      }else{
        
      }

      if( $("#deliveryType").val() == "")
      {
        
        $("#lcms-detail-error").append("<p style='color:red'>Delivery type is mandatory</p>");
        $valid = false;
        
      }else{
        
      }

      if( $("input[name='targetheatre']:checked").val() == undefined)
      {
        
        $("#lcms-detail-error").append("<p style='color:red'>Target Theatre is mandatory</p>");
        $valid = false;
        
      }else{
        
      }


      if($valid == true){
        window.lcmsErrorDialouge.dialog("close");
        console.log("validation passed");
        this.saveDetails();
      }else{
        return false;
      }
      
    },

    saveDetails: function() {
      console.log("In Save");

      // get all property values and create a json
      var postData = {};

      $("#diagMsgDiv").html("Please wait while changes are saved...");
      window.lcmsMessageDialog.dialog("open");


      postData.title = $("#title").val();
      postData.description = $("#description").val();
      postData.branch = $("#branchselectNodeRef").val();;
      postData.url = $("#url").val();


      var targetTheatres= [];
      $("input[name='targetheatre']:checked").each(function(){ targetTheatres.push($(this).val()); });
      
      postData.targetTheatre = targetTheatres;
      
      var languages = [];
      $("input[name='language']:checked").each(function(){  languages.push($(this). val()); });
      
      postData.language = languages;

      postData.deliveryType = $("#deliveryType").val();
      postData.contentOwner = $("#contentOwner").val();
    
      postData.availableDate = $("input[name='availableDate']").val();
      postData.endDate = $("input[name='endDate']").val();
      postData.ciscoInternalSearchableby = $("input[name='ciscoInternalSearchableby']:checked").val();
      postData.learningObjective = $("#cisco_Internal_LearnersDevelopers").val();
      postData.learningObjective = $("#cisco_Internal_ContentDevelopers").val();
      postData.authorEmailId = $("#authorEmailId").val();
      postData.sme = $("#sme").val();
      postData.presenter = $("#presenter").val();
      postData.sourceOrg = $("#sourceOrg").val();
      postData.clientReqOrgn = $("#clientReqOrgn").val();
      postData.learnerOrg = $("#learnerOrg").val();
      postData.learnerJobGroup = $("#learnerJobGroup").val();
      postData.learnerRole = $("#learnerRole").val();
      postData.learnerJobTasks = $("#learnerJobTasks").val();
      postData.entitlementLevel = $("#entitlementLevel").val();
      postData.portalEndDate = $("#LcmsTaggingPortalEndDate").val();

      var bitRate = [];
      $("input[name='bitRate']:checked").each(function(){  bitRate.push($(this). val()); });
      postData.bitRate = bitRate;
      
      var fileFormat = [];
      $("input[name='fileFormat']:checked").each(function(){  fileFormat.push($(this). val()); });
      postData.fileFormat = fileFormat;
      
      postData.sysReq = $("#sysReq").val();
      postData.releaseVersion = $("#releaseVersion").val();
      postData.usageNotes = $("#usageNotes").val();
      postData.learningObjective = $("#learningObjective").val();
      postData.compTime = $("#LcmsTaggingcompTime").val();
      postData.duration = $("#duration").val();
      postData.contentType = $("#contentType").val();

      postData.portfolio = $("#portfolio").val();
      postData.aggLevel = $("#aggLevel").val();

      postData.keywords = $("#keywords").val();
      postData.learningCategory = $("#learningCategory").val();
      postData.marketSegment = $("#marketSegment").val();
      postData.ciscoProducts = $("#ciscoProducts").val();
      postData.networkSolutions = $("#networkSolutions").val();
      postData.verticalIndustry = $("#verticalIndustry").val();
      postData.technologies = $("#technologies").val();
      postData.businessSolutions = $("#businessSolutions").val();
      postData.learningProgram = $("#learningProgram").val();
    

      console.log("postData: ", postData);
      var parentContext=this;
      // submit json to service, in response you will get artifactNodeId

      var ajax = new XMLHttpRequest();
      ajax.open("POST", '/share/proxy/alfresco/edit/lcms');
      ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log("AJAX reposne: ", this.responseText);
          var responseText = JSON.parse(this.responseText);
          $("#artifactNodeId").val(responseText.nodeRef);

          if( $("input[name='lcms-content']:checked").val() === 'uploadocument' ){
        
            // upload file attachment along with artifactNodeId to another service
            var uploadOption = {data:{}};
            uploadOption.data.artifactNodeId = responseText.nodeRef;
            uploadOption.data.uploadAction = "create";
            uploadOption.data.publish = "false";  
            uploadOption.files = $('input[name="lcms-upload-content"]');
            
              var formdata = new FormData();
              formdata.append("artifactNodeId", uploadOption.data.artifactNodeId);
              formdata.append("uploadAction", uploadOption.data.uploadAction);
              formdata.append("X-Requested-With","IFrame");
              formdata.append("X-HTTP-Accept","application/json, text/javascript, *//*; q=0.01");
              formdata.append("file", uploadOption.files[0].files[0]);
              formdata.append("publish", uploadOption.data.publish);
          

              var uploadAjax = new XMLHttpRequest();
              uploadAjax.open("POST", '/share/proxy/alfresco/lcms/upload');
              uploadAjax.send(formdata);
              uploadAjax.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                  $("#diagMsgDiv").html("Saved successfully");
                  window.location.href = "editLcms?nodeRef=" + responseText.nodeRef;
                }
              }
              
          } else if( $("input[name='lcms-content']:checked").val() === 'folder' ){
                      
            var folderData = new FormData();
            $.each($("input[name='lcms-upload-content-folder']")[0].files, function(i, file) {
              folderData.append('file', file);
            });
            folderData.append('artifactNodeId', responseText.nodeRef);
            folderData.append('uploadAction', "create");
            folderData.append('publish', "false");
            debugger;

            $.ajax({
                type: 'POST',
                url: '/share/proxy/alfresco/lcms/upload',
                cache: false,
                contentType: false,
                processData: false,
                data : folderData,
                success: function(result){
                  $("#diagMsgDiv").html("Saved successfully");
                  // window.location.href = "editLcms?nodeRef=" + responseText.nodeRef;
                },
                error: function(err){
                    console.log(err);
                }
            });

          }else{
            $("#diagMsgDiv").html("Saved successfully");
            window.location.href = "editLcms?nodeRef=" + responseText.nodeRef;
          }   
        }
      };
      ajax.send(JSON.stringify(postData));
      
    },

    onSaveAndNext: function () {
      window.location.href = "editBom?nodeRef=" + this.model.get('nodeRef') + "&activeTab=setup";
    },
    
    onChangeTab: function () {
      this.gotoTab(this.model.get('activeTab'));
    },

    onModelChange: function () {
      this.toggleButtons();
    },

  handleFileSelect:function() {
    var uploadData = new FormData();
    var uploadFileError = '';
    var sizeInMB = 0;
    var size = 0;
    var maxUploadFiles = 100;
    var individualFileSize=500;
    var maxUploadSize = 5120;
    var timeforGB = 100;
    var time;
   
    var files = $('input[name="lcms-upload-content-folder"]')[0].files; // FileList object
    //let sizeInGB = sizeInMB / 1024;
    // checking Maximum file count 
    if(files.length > maxUploadFiles){
      uploadFileError = 'Upload number limit exceeded max number "' + maxUploadFiles + '"';
      return ;
    }
    // consider the file count less than required count
    else{
      for(var i=0;i<files.length;i++){
        var fsizeInMB = (files[i].size) / (1024 * 1024);
        if (fsizeInMB >= individualFileSize) {
          uploadFileError = 'Individual File Upload size limit exceeded max size "' + individualFileSize + ' MB" '+files[i].name;
          return;
        }
        else{           
          size += parseInt(files[i].size);
          // uploadData.append('rawFiles', files[i], (files[i].webkitRelativePath != '') ? JSON.stringify({ 'objectName': files[i].webkitRelativePath, 'lastModifiedDate': files[i].lastModifiedDate }) : JSON.stringify({ 'objectName': files[i].name, 'lastModifiedDate': files[i].lastModifiedDate }));
          uploadData.append('rawFiles', files[i]);
        }
      }
      sizeInMB = size / (1024 * 1024);
      debugger;      
      if (sizeInMB > maxUploadSize) {
        uploadFileError = " Total Files size should not be more than '"+(sizeInMB/1024)+" Gb'";
        return;
      }
    }

    debugger;
    return uploadData;
  },
	
    render: function () {
      $("#lcmstaggingPublish").hide();

      // TODO: deal with this
      window.lcmsMessageDialog = $( "#dialog-MessageDialog" ).dialog({
        autoOpen: false,
        resizable: false,
        height: "auto",
        width: 500,
        modal: true,
        buttons: {
          Close: function() {
            $( this ).dialog( "close" );
          },
         
        }
      });
      return this;
    },
  });
}());
