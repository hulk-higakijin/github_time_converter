const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

window.onload = function () {
  // DOM変更を監視する関数
  function observeMutations() {
    let observer = new MutationObserver(function (mutations) {
      observer.disconnect(); // observerを一時的に切断
      mutations.forEach(function (mutation) {
        if (mutation.type === "childList") {
          updateRelativeTimes();
        }
      });
      observer.observe(document.body, config); // observerを再度接続
    });

    let config = { childList: true, subtree: true };

    observer.observe(document.body, config);
  }

  // 相対時間を更新する関数
  function updateRelativeTimes() {
    let relativeTimeElements = document.getElementsByTagName("relative-time");

    for (let element of relativeTimeElements) {
      // 既に更新されている要素はスキップ
      if (element.hasAttribute("data-updated")) {
        continue;
      }

      let datetime = element.getAttribute("datetime");
      let date = new Date(datetime);
      let weekday = weekdays[date.getDay()];

      // dateオブジェクトを必要な形式に変換
      let formattedDate = `${date.getFullYear()}/${
        date.getMonth() + 1
      }/${date.getDate()}(${weekday})`;

      // 新しい span 要素を作成し、絶対時間をセット
      let span = document.createElement("span");
      span.textContent = formattedDate;

      // <relative-time> 要素の後ろに新しい span 要素を追加
      element.parentNode.insertBefore(span, element.nextSibling);

      // 更新済みとマーク
      element.setAttribute("data-updated", "true");

      // relative-time要素を非表示
      element.style.display = "none";
    }
  }

  // 初期の更新
  updateRelativeTimes();

  // 非同期の更新を監視
  observeMutations();
};
