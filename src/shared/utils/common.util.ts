import { OptionType } from '@/shared/types/common.type';

export class CommonUtil {
  static isEmpty(str: string) {
    if (!str) return true;
    if (str.length === 0) return true;
    return str.trim().length === 0;
  }

  /**
   * 문자열을 JSON 형식으로 변환
   * @param str 문자열
   * @returns JSON 형식의 문자열
   */
  static stringToJson(str: string) {
    if (this.isEmpty(str)) {
      throw new Error('문자열이 비어있습니다.');
    }

    return JSON.stringify(str, null, 2);
  }

  /**
   * 휴대폰 번호 '-'가 있다면 제거, 없으면 그대로 반환
   * @example
   * 010-123-4567 -> 0101234567
   * 010-1234-5678 -> 01012345678
   * 01012345678 -> 01012345678
   *
   * @param phone 휴대폰 번호
   * @returns '-' 제거된 휴대폰 번호
   */
  static formatPhoneWithoutHyphen(phone: string) {
    return phone.trim().replace(/-/g, '');
  }

  /**
   * 휴대폰 번호 '-'가 없다면 '-'를 추가
   * @example
   * 01012345678 -> 010-1234-5678
   * 0101234567 -> 010-123-4567
   *
   * @param phone 휴대폰 번호
   * @returns '-'가 추가된 휴대폰 번호
   */
  static formatPhoneWithHyphen(phone: string) {
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }

  /**
   * 문자열에서 모든 점을 줄바꿈으로 변환
   * @param str 문자열
   * @returns 모든 점이 줄바꿈으로 변환된 문자열
   */
  static replaceAllDotsToNewLine(str: string) {
    return str.replace(/\./g, '.\n');
  }

  /**
   * 파일을 FormData에 append하는 공통 함수
   * 파일 이름이 한글이 깨지는 것을 방지하기 위해 인코딩 처리
   * @param formData FormData 객체
   * @param file 파일 객체
   * @param key FormData에 append할 key 값
   */
  static appendFileEncodedToFormData(formData: FormData, file: File, key: string): void {
    const blob = file.slice(0, file.size, file.type);
    const encodedFile = new File([blob], encodeURIComponent(file.name), { type: file.type });
    formData.append(key, encodedFile);
  }

  static changeListToOption<T extends OptionType<string>>(list: T[]) {
    return list.map((item) => ({
      label: item.label,
      value: item.value,
    }));
  }

  /**
   * 배열이 비어있는지 확인
   * @param arr 배열
   * @returns 배열이 비어있으면 true, 아니면 false
   */
  static isEmptyArray<T>(arr: T[] | null | undefined): boolean {
    return !arr || arr.length === 0;
  }

  /**
   * 객체가 비어있는지 확인
   * @param obj 객체
   * @returns 객체가 비어있거나 null/undefined이면 true, 아니면 false
   */
  static isEmptyObject(obj: Record<string, unknown> | null | undefined): boolean {
    return !obj || Object.keys(obj).length === 0;
  }

  /**
   * 두 배열이 서로 같은지 깊은 비교로 확인
   * 중첩된 배열과 객체도 재귀적으로 비교
   * @param arr1 첫 번째 배열
   * @param arr2 두 번째 배열
   * @returns 두 배열이 같으면 true, 다르면 false
   */
  static isEqualArray<T>(arr1: T[], arr2: T[]): boolean {
    if (arr1 === arr2) return true;
    if (!arr1 || !arr2) return false;
    if (arr1.length !== arr2.length) return false;

    return arr1.every((item, index) => this.isDeepEqual(item, arr2[index]));
  }

  /**
   * 두 객체가 서로 같은지 깊은 비교로 확인
   * 중첩된 객체와 배열도 재귀적으로 비교
   * @param obj1 첫 번째 객체
   * @param obj2 두 번째 객체
   * @returns 두 객체가 같으면 true, 다르면 false
   */
  static isEqualObject<T extends Record<string, unknown>>(obj1: T, obj2: T): boolean {
    return this.isDeepEqual(obj1, obj2);
  }

  /**
   * 두 값이 서로 같은지 깊은 비교로 확인
   * 객체와 배열의 중첩 구조도 재귀적으로 비교
   * 순환 참조도 안전하게 처리
   * @param value1 첫 번째 값
   * @param value2 두 번째 값
   * @returns 두 값이 같으면 true, 다르면 false
   */
  static isDeepEqual(value1: unknown, value2: unknown): boolean {
    return this._deepEqual(value1, value2, new WeakSet());
  }

  /**
   * 내부 깊은 비교 함수 (순환 참조 처리용)
   * @private
   */
  private static _deepEqual(value1: unknown, value2: unknown, visited: WeakSet<object>): boolean {
    if (value1 === value2) return true;

    if (value1 === null || value2 === null) return value1 === value2;
    if (value1 === undefined || value2 === undefined) return value1 === value2;

    if (typeof value1 !== typeof value2) return false;

    if (typeof value1 !== 'object') return value1 === value2;

    const obj1 = value1 as object;
    const obj2 = value2 as object;

    // 순환 참조 체크
    if (visited.has(obj1) || visited.has(obj2)) {
      return obj1 === obj2;
    }

    visited.add(obj1);
    visited.add(obj2);

    try {
      // Date 객체 비교
      if (value1 instanceof Date && value2 instanceof Date) {
        return value1.getTime() === value2.getTime();
      }

      // RegExp 객체 비교
      if (value1 instanceof RegExp && value2 instanceof RegExp) {
        return value1.toString() === value2.toString();
      }

      // 배열 비교
      if (Array.isArray(value1) && Array.isArray(value2)) {
        if (value1.length !== value2.length) return false;

        return value1.every((item, index) => this._deepEqual(item, value2[index], visited));
      }

      if (Array.isArray(value1) || Array.isArray(value2)) return false;

      // 객체 비교
      const obj1Record = value1 as Record<string, unknown>;
      const obj2Record = value2 as Record<string, unknown>;
      const keys1 = Object.keys(obj1Record);
      const keys2 = Object.keys(obj2Record);

      if (keys1.length !== keys2.length) return false;

      // Set을 사용하여 O(1) 조회 성능 향상
      const keys2Set = new Set(keys2);

      return keys1.every((key) => {
        if (!key || !keys2Set.has(key)) return false;

        const val1 = obj1Record[key];
        const val2 = obj2Record[key];

        return this._deepEqual(val1, val2, visited);
      });
    } finally {
      visited.delete(obj1);
      visited.delete(obj2);
    }
  }
}
