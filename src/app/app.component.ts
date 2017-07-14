import { Component, OnInit } from '@angular/core';

import { PlanService } from './plan.service';
import { Plan } from './plan';

@Component({
  selector: 'app-plan',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PlanService]
})

export class AppComponent implements OnInit {
  title = 'todos';
  planList: Plan[]; // 予定リスト
  newTodoText: string = ""; // 入力された予定
  isAllcheck: boolean = false; // 全選択用のチェックボックスの状態（true...チェックあり, false...チェックなし）
  constructor(private planService: PlanService) { }

  /**
   * 「リストに予定を追加する」
   *    テキストボックスにカーソルが合った状態でEnterを押すと呼び出される
   */
  addPlan(): void {
    var plan = new Plan();
    var empty = this.planService.isEmpty(this.newTodoText);
    if (empty) {
      this.newTodoText = "";
      return;
    }
    plan.value = this.newTodoText;
    this.planList = this.planService.addPlan(plan, this.planList);
    this.newTodoText = "";
  }

  /**
   * 「チェックボックスの状態を変更」
   *    チェックボックスをクリックすると呼び出される
   * 
   * @param plan チェックボックスの値が変更された予定
   */
  changeCheckbox(plan: Plan): void {
    this.planService.changeCheckbox(plan);
    this.planService.updateStorage(this.planList);
  }

  /**
   * 「すべてのチェックボックスの状態を変更する」
   *    予定入力欄の横のチェックボックスをクリックすると呼び出される
   */
  allChangeCheckbox(): void {
    this.planService.allChangeCheckbox(this.isAllcheck, this.planList);
    this.planService.updateStorage(this.planList);
  }

  /**
   * 「選択されたリストを削除する」
   *    チェックボックスにチェックを入れた後（Clear completed）をクリックすると呼び出される
   */
  deleteCheckedPlan(): void {
    this.planList = this.planService.deleteCheckedPlan(this.planList);
    if (this.planList === null) {
      return;
    }
    this.planService.updateStorage(this.planList);
    this.isAllcheck = false;
  }

  /**
   * 「特定のリストを削除する」
   *    リストの上にカーソルを合わせ右端の（×）をクリックすると呼び出される
   * 
   * @param plan 削除する予定
   */
  deletePlanOne(plan: Plan): void {
    this.isAllcheck = false;
    plan.isCompleted = true;
    this.planList = this.planService.deletePlanOne(plan, this.planList);
    this.planService.updateStorage(this.planList);
  }

  /**
   * 「削除ボタンを表示する」
   *    リストにカーソルが合った時に呼び出される
   * 
   * @param plan 削除ボタンを表示する予定
   */
  showBtn(plan: Plan): void {
    plan.isShowDeleteBtn = true;
  }

  /**
   * 「削除ボタンを隠す」
   *    リストからカーソルが外れたとき呼び出される
   * 
   * @param plan 削除ボタンを隠す予定
   */
  hideBtn(plan: Plan): void {
    plan.isShowDeleteBtn = false;
  }

  /**
     * チェックボックスの状態からリストの個数をカウントする
     * 
     * @return チェックのついていない予定の数
     */
  leftItemsCount(): number {
    return this.planList.filter(plan => !plan.isCompleted).length;
  }

  /**
     * チェックボックスが押されているか判断する
     * 
     * @return １つでもチェックボックスが押されている状態か
     * true...押されている, false...押されていない
     */
  checkboxIsSelected(): boolean {
    var selected = false;
    for (var i = 0; i < this.planList.length; i++) {
      if (this.planList[i].isCompleted) {
        selected = true;
      }
    }
    return selected;
  }

  /**
   * ページが読み込まれたときにローカルストレージに予定があれば表示する。
   * なければリストを初期化する
   */
  ngOnInit(): void {
    if (this.planService.getPlanStorage().length !== 0) {
      this.planList = this.planService.getPlanStorage();
    } else {
      this.planList = null;
    }
  }

}
