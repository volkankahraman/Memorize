var voicefix;

document.addEventListener('DOMContentLoaded', function () {
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {
    edge: 'left'
  });
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //$("[id=turkishSpeech]").removeClass('hide');
  }
  voicefix = 0;
  read("null"); // Text to Speech bugını düzeltmek için

});
$(document).ready(function () {
  $('select').formSelect();
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  switch (pageCount) {
    case "5":
      M.toast({
        html: 'Tebrikler! Siteyi 5 kez ziyaret ettin'
      });
      break;
    case "10":
      M.toast({
        html: 'Tebrikler! Siteyi 10 kez ziyaret ettin. Uygulamayı seviyosun Sanırım.<3'
      });
      break;
    case "50":
      M.toast({
        html: 'Tebrikler! Siteyi 50 kez ziyaret ettin Umarım bir şeyler Öğrenmişsindir :)'
      });
      break;
  }
  $('.modal').modal();
});
$('form').on('submit', function () {
  var worddata = {
    englishWord: $('#englishWord').val(),
    turkishWord: $('#turkishWord').val(),
    type: $('#type').val(),
    sentence: $('#sampleSentence').val()
  };
  $.ajax({
    type: 'POST',
    url: '/',
    data: worddata,
    success: function (data) {
      //do something with the data via front-end framework
      location.reload();
    }
  });
});
$(document).on("click",".word-delete", function () {
  if (confirm("Silmek istediğinize emin misiniz?")) {
    $.ajax({
      type: 'DELETE',
      url: '/delete/'+ $(this).attr('id'),
      datatype: "datatype",
      success: function (data) {
        //do something with the data via front-end framework
        location.reload();
      }
    });
  } 
});

function read(txt, lang) {
  msg = new SpeechSynthesisUtterance();
  msg.voice = window.speechSynthesis.getVoices()[2];
  //msg.lang = 'en-US';
  msg.lang = lang;
  msg.text = txt;
  if (voicefix == 0) {
    msg.volume = 0;
    voicefix++;
  } else
    window.speechSynthesis.speak(msg);
}