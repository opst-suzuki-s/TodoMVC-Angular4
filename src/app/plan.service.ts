import { Injectable } from '@angular/core';

import { Plan } from './plan';

@Injectable()
export class PlanService {
    // Gitのテスト
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
        return planList;
    }

    /**
     * チェックボックスの状態を変更する
     * 
     * @param plan 状態を変更する予定
     */
    changeCheckbox(plan: Plan): void {
        plan.isCheck = !plan.isCheck;
    }

    /**
     * チェックボックスが押されているか判断する
     * 
     * @param planList 現在の予定リスト
     * @return １つでもチェックボックスが押されている状態か
     * true...押されている, false...押されていない
     */
    checkboxIsSelected(planList: Plan[]): boolean {
        var selected = false;
        for (var i = 0; i < planList.length; i++) {
            if (planList[i].isCheck) {
                selected = true;
            }
        }
        return selected;
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
            plan.isCheck = checking;
        });
    }

    /**
     * チェックボックスが押されたリストを削除し、削除後の新規リストを作成
     * 
     * @param planList 現在の予定リスト
     * @return チェックがついている予定を削除した後のリスト
     */
    deleteCheckedPlan(planList: Plan[]): Plan[] {
        var deletePlanList: Plan[] = [];
        var deleteIdx: number = 0;
        var count: number = this.countPlanOnCheck(planList, true);
        if (planList.length === count) {
            planList = null;
            return planList;
        }
        while (deleteIdx < planList.length) {
            if (planList[deleteIdx].isCheck === true) {
                planList.splice(deleteIdx, 1);
                deleteIdx = 0;
            } else {
                deleteIdx++;
            }
        }
        return planList;
    }

    /**
     * 特定のリストを削除する
     * 
     * @param plan 削除する予定
     * @param planList 現在の予定リスト
     * @return 予定が削除された後のリスト
     */
    deletePlanOne(plan: Plan, planList: Plan[]): Plan[] {
        var arrayIdx: number = 0;
        var deleteIdx: number = 0;
        if (planList.length === 1) {
            planList = null;
            return planList;
        }
        while (deleteIdx < planList.length) {
            if (planList[deleteIdx] === plan) {
                planList.splice(deleteIdx, 1);
            }
            deleteIdx++;
        }
        return planList;
    }

    /**
     * チェックボックスの状態からリストの個数をカウントする
     * @param planList 現在の予定リスト
     * @param checkPattern カウントするチェックボックスの状態
     * true...チェックあり, false...チェックなし
     */
    countPlanOnCheck(planList: Plan[], checkPattern: boolean): number {
        var count: number = 0;
        for (var i = 0; i < planList.length; i++) {
            if (planList[i].isCheck === checkPattern) {
                count++;
            }
        }
        return count;
    }
}