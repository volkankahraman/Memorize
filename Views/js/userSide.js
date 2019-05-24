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
var selectedWords = [];
$(document).on('dblclick', '.card-panel', function () {
  if (target == "english" || target == "turkish") {
    if ($(this).hasClass('selectedCard')) {
      for (var i = selectedWords.length - 1; i >= 0; i--) {
        if (selectedWords[i] === $(this).find('.id').attr('id')) {
          selectedWords.splice(i, 1);
        }
      }
      $(this).removeClass('selectedCard');
    } else {
      selectedWords.push($(this).find('.id').attr('id'));
      $(this).addClass('selectedCard');
    }
    if (selectedWords[0] != null) {
      $('.fixed-action-btn').removeClass('hide');
    } else {
      $('.fixed-action-btn').addClass('hide');
    }
  }
  if(target=="learningWords"){
      var word = prompt("Hatırladığınız sözcüğü yazınız:");
      if (word == null || word == "") {
        alert("Lütfen boş geçmeyiniz");
      } else {
        var obj={
          id: $(this).find('.id').attr('id'),
          txt:word,
          level:$(this).find('.level').attr('id')
        };
        console.log(obj);
        $.ajax({
          type: 'POST',
          url: window.location.href,
          data: obj,
          success: function (data) {
            location.reload();
          }
        });
      }
  }
});
$('#btnSend').click(function () {
  $.ajax({
    type: 'POST',
    url: window.location.href,
    data: {
      selectedWords
    },
    success: function (data) {
      console.log(data);
      M.toast({
        html: 'Öğrenilen sözcüklere eklendi.'
      });
      setTimeout(function(){
        location.href ="/learningWords";

      },500);
    }
  });
});