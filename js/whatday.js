$(function(){

  $("#calculationBtn").on('click', function(e) {
    var year = $("#year").val();
    var month = $("#month").val();
    var day = $("#day").val();
    var number = $("#number").val();
    var resultDay = 0;

    // バリデーション 
    // ０より大きい整数、月は１２以下、日は３１以下
    if( (year.match(/^([1-9]\d*)$/)) && (month < 13 && month.match(/^([1-9]\d*)$/)) && (day < 32 && day.match(/^([1-9]\d*)$/)) && (number.match(/^([1-9]\d*)$/)) ){

      // ３１日まである月は実行
      if( month === "1" || month === "3" || month === "5" || month === "7" || month === "8" || month === "10" || month === "12" ){
        calculation();
      // ３０日まである月は日が３０以下で実行
      }else if( (month === "4" || month === "6" || month === "9" || month === "11") && day < 31 ){
        calculation();
      // 日が２８以下なら実行
      }else if(day < 29){
        calculation();
      // 29日は分岐
      }else if( day === "29" ){
        if(year % 4 === 0 && year % 100 === 0 && year % 400 != 0){
          $("#alert").html("うるう年ではありません。正しい日付を入力してください。");
        }else if(year % 4 === 0){
          calculation();
        }else{
          $("#alert").html("うるう年ではありません。正しい日付を入力してください。");
        }
      }else{
        $("#alert").html("存在しない日付です。正しい値を入力してください。");
      }
    }else {
      $("#alert").html("存在しない日付です。正しい値を入力してください。");
    }

    // 日付を計算する関数
    function calculation(){

      $("#alert").html("");

      year = Number(year);
      month = Number(month);
      day = Number(day);
      number = Number(number);

      while (resultDay < 1) {
        // 「月」で場分け
        switch(month) {
    
          // 31日の月
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
            if((31 - day - number) >= 0){
              resultDay = day + number;
            }else{
              month += 1;
              number = number - (31 - day);
              day = 0;
            }
          break;
    
          // 30日の月
          case 4:
          case 6:
          case 9:
          case 11:
            if(30 - day - number >= 0){
              resultDay = day + number;
            }else{
              month += 1;
              number = number - (30 - day);
              day = 0;
            }
          break;
    
          // 2月
          case 2:
            if(year % 4 === 0 && year % 100 === 0 && year % 400 != 0){
              // 平年
              if(28 - day - number >= 0){
                resultDay = day + number;
              }else{
                month += 1;
                number = number - (28 - day);
                day = 0;
              }
            }else if(year % 4 === 0){
              // 閏年
              if(29 - day - number >= 0){
                resultDay = day + number;
              }else{
                month += 1;
                number = number - (29 - day);
                day = 0;
              }
            }else{
              // 平年
              if(28 - day - number >= 0){
                resultDay = day + number;
              }else{
                month += 1;
                number = number - (28 - day);
                day = 0;
              }
            }
          break;
          
          // 12月
          case 12:
            if(31 - day - number >= 0){
              resultDay = day + number;
            }else{
              month = 1;
              year += 1;
              number = number - (31 - day);
              day = 0;
            }
          break;
          default:
          break;
        }
      }
    
      $("#result").html(year + "年" + month + "月" + resultDay + "日です");
    }
  });
});

// 365,12,28,29,30,31,4

// 平年の場合と閏年の場合で場分け

// マイナスや少数、実在しない日のエラー処理