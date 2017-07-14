export class Plan {
    public value: string; // 予定内容
    public isCompleted: boolean = false; // チェックボタンの状態（true...チェックあり, false...チェックなし）
    public isShowDeleteBtn: boolean = false; // 削除ボタンの表示（true...表示する, false...隠す）
}