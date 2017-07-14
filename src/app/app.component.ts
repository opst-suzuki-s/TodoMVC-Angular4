import { Component, OnInit } from '@angular/core';

import { PlanService } from './plan.service';
import { PlanStorage } from './plan-storage.service';
import { Plan } from './plan';

@Component({
  selector: 'app-plan',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PlanService, PlanStorage]
})

export class AppComponent implements OnInit {
  title = 'todos';
  planList: Plan[];
  newTodoText: string = "";
  isAllcheck: boolean = false;
  isShowDeleteListBtn: boolean = false;
  listCnt: number = 0;
  constructor(private planService: PlanService,
    private storageService: PlanStorage) { }

  /**
   * 「リストに予定を追加する」
   *    テキストボックスにカーソルが合った状態でEnterを押すと呼び出される
   */
  addPlan(): void {
    var plan = new Plan();
    var temporaryList: Plan[];
    var empty = this.planService.isEmpty(this.newTodoText);
    if (empty) {
      this.newTodoText = "";
      return;
    }
    plan.value = this.newTodoText;
    temporaryList = this.planService.addPlan(plan, this.planList);
    this.storageService.addPlanStorage(temporaryList);
    this.planList = this.storageService.getPlanStorage();
    this.newTodoText = "";
    this.isShowDeleteListBtn = this.planService.checkboxIsSelected(this.planList);
    this.listCnt = this.planService.countPlanOnCheck(this.planList, false);
  }

  /**
   * 「チェックボックスの状態を変更」
   *    チェックボックスをクリックすると呼び出される
   * 
   * @param plan チェックボックスの値が変更された予定
   */
  changeCheckbox(plan: Plan): void {
    this.planService.changeCheckbox(plan);
    this.storageService.deleteAllPlan();
    this.storageService.addPlanStorage(this.planList);
    this.isShowDeleteListBtn = this.planService.checkboxIsSelected(this.planList);
    this.listCnt = this.planService.countPlanOnCheck(this.planList, false);
  }

  /**
   * 「すべてのチェックボックスの状態を変更する」
   *    予定入力欄の横のチェックボックスをクリックすると呼び出される
   */
  allChangeCheckbox(): void {
    this.planService.allChangeCheckbox(this.isAllcheck, this.planList);
    this.storageService.deleteAllPlan();
    this.storageService.addPlanStorage(this.planList);
    this.isShowDeleteListBtn = this.planService.checkboxIsSelected(this.planList);
    this.listCnt = this.planService.countPlanOnCheck(this.planList, false);
  }

  /**
   * 「選択されたリストを削除する」
   *    チェックボックスにチェックを入れた後（Clear completed）をクリックすると呼び出される
   */
  deleteCheckedPlan(): void {
    this.storageService.deleteAllPlan();
    this.isAllcheck = false;
    this.planList = this.planService.deleteCheckedPlan(this.planList);
    if (this.planList === null) {
      return;
    }
    this.isShowDeleteListBtn = this.planService.checkboxIsSelected(this.planList);
    this.storageService.addPlanStorage(this.planList);
    this.listCnt = this.planService.countPlanOnCheck(this.planList, false);
  }

  /**
   * 「特定のリストを削除する」
   *    リストの上にカーソルを合わせ右端の（×）をクリックすると呼び出される
   * 
   * @param plan 削除する予定
   */
  deletePlanOne(plan: Plan): void {
    this.storageService.deleteAllPlan();
    this.isAllcheck = false;
    plan.isCheck = true;
    this.planList = this.planService.deletePlanOne(plan, this.planList);
    this.isShowDeleteListBtn = this.planService.checkboxIsSelected(this.planList);
    this.storageService.addPlanStorage(this.planList);
    this.listCnt = this.planService.countPlanOnCheck(this.planList, false);
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
   * ページが読み込まれたときにローカルストレージに予定があれば表示する。
   * なければリストを初期化する
   */
  ngOnInit(): void {
    if (this.storageService.getPlanStorage().length !== 0) {
      this.planList = this.storageService.getPlanStorage();
      this.isShowDeleteListBtn = this.planService.checkboxIsSelected(this.planList);
      this.listCnt = this.planService.countPlanOnCheck(this.planList, false);
    } else {
      this.planList = null;
    }
  }

}
