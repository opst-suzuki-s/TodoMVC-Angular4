import { Injectable } from '@angular/core';

import { Plan } from './plan';

const MY_STORAGE_KEY = 'planList';

@Injectable()
export class PlanService {

    /**
     * 予定の内容が空、またはスペースだけじゃないかを判断する
     * 
     * @param text 入力された予定
     * @return 入力されているか　true...空文字, false...文字が入力されている
     */
    isEmpty(text: string): boolean {
        return !text.trim().length;
    }

    /**
     * リストに予定追加する
     * 
     * @param plan 追加する予定
     * @param planList 現在の予定のリスト
     * @return 予定が追加された後のリスト
     */
    addPlan(plan: Plan, planList: Plan[]): Plan[] {
        if (planList === null) {
            planList = [plan];
        } else {
            planList.push(plan);
        }
        localStorage.setItem(MY_STORAGE_KEY, JSON.stringify(planList));
        return planList;
    }

    /**
     * チェックボックスの状態を変更する
     * 
     * @param plan 状態を変更する予定
     */
    changeCheckbox(plan: Plan): void {
        plan.isCompleted = !plan.isCompleted;
    }

    /**
     * すべてのチェックボックスの状態を変更する
     * 
     * @param isAllcheck 全選択のチェックボックスの状態
     * @param planList 現在の予定リスト
     */
    allChangeCheckbox(isAllcheck: boolean, planList: Plan[]): void {
        var checking = !isAllcheck;
        planList.forEach(function (plan) {
            plan.isCompleted = checking;
        });
    }

    /**
     * チェックボックスが押されたリストを削除し、削除後の新規リストを作成
     * 
     * @param planList 現在の予定リスト
     * @return チェックがついている予定を削除した後のリスト
     */
    deleteCheckedPlan(planList: Plan[]): Plan[] {
        var count: number = this.countPlanOnCheck(planList);
        if (planList.length === count) {
            planList = null;
            return planList;
        }
        return planList.filter(plan => !plan.isCompleted);
    }

    /**
     * 特定のリストを削除する
     * 
     * @param plan 削除する予定
     * @param planList 現在の予定リスト
     * @return 予定が削除された後のリスト
     */
    deletePlanOne(deletePlan: Plan, planList: Plan[]): Plan[] {
        if (planList.length === 1) {
            planList = null;
            return planList;
        }
        return planList.filter(plan => deletePlan !== plan);
    }

    /**
     * チェックボックスの状態からリストの個数をカウントする
     * 
     * @param planList 現在の予定リスト
     * true...チェックあり, false...チェックなし
     * @return チェックされた予定の数
     */
    countPlanOnCheck(planList: Plan[]): number {
        return planList.filter(plan => plan.isCompleted).length;
    }

    /**
     * 引数のリストをローカルストレージに更新する
     * 
     * @param planList 更新する予定リスト
     */
    updateStorage(planList: Plan[]): void {
        localStorage.removeItem(MY_STORAGE_KEY);
        localStorage.setItem(MY_STORAGE_KEY, JSON.stringify(planList));
    }

    /**
     * 「ローカルストレージの中身を全取得する」
     * 
     * @return ローカルストレージの中身を配列として返す
     */
    getPlanStorage(): Plan[] {
        return JSON.parse(localStorage.getItem(MY_STORAGE_KEY)) || [];
    }
}