import { Injectable } from '@angular/core';

import { Plan } from './plan';

const MY_STORAGE_KEY = 'planList';

export class PlanStorage {

    /**
     * 「ローカルストレージに予定を追加する」
     * 
     * @param planList 現在の予定リスト
     */
    addPlanStorage(planList: Plan[]): void {
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

    /**
     * 「ローカルストレージの中身をすべて削除する」
     */
    deleteAllPlan(): void {
        localStorage.removeItem(MY_STORAGE_KEY);
    }

}