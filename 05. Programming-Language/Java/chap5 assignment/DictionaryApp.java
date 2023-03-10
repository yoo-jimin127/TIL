//chapter 5_number 10
package chapter5_yoojimin;

abstract class PairMap {
	protected String keyArray []; //key 저장 배열
	protected String valueArray[]; //value 저장 배열
	abstract String get(String key); // key값을 가진 value 리턴, 없으면 null 리턴
	abstract void put(String key, String value); //key와 value를 쌍으로 저장. 기존에 key가 있으면, 값을 value로 수정
	abstract String delete(String key); //key 값을 가진 아이템 (value 와 함께) 삭제, 삭제된 value 값 리턴
	abstract int length(); //현재 저장된 아이템의 개수 리턴
}
	
class Dictionary extends PairMap {
	private int dic_count;
	
	public Dictionary(int size) {
		this.dic_count = 0;
		keyArray = new String [size];
		valueArray = new String [size];
	}
	
	@Override
	public String get(String key) {
		for (int i = 0; i < keyArray.length; i++) {
			if ( key.equals(keyArray[i])) {
				return valueArray[i];
			}
		}
		return null;
	}
	
	@Override
	public void put(String key, String value) {
		int i = 0;
		for (i = 0; i < dic_count; i++) {
			if (keyArray[i].equals(key)) {
				break;
			}
		}
			
			if (i == dic_count && i < keyArray.length) {
				dic_count++;	
				keyArray[i] = key;
				valueArray[i] = value;
			}
			
			else {
				keyArray[i] = key;
				valueArray[i] = value;
			}
		}
	
	@Override
	public String delete(String key) {
		int i = 0;
		for (i = 0; i < dic_count; i++) {
			if (keyArray[i].equals(key)) {
				break;
			}
		}
			
		if (i == dic_count) {
			return null;
		}
			
		else {				
			keyArray[i] = null;
			valueArray[i] = null;
		}
		return valueArray[i];
	}
	
	@Override
	public int length() { return dic_count; }
}

public class DictionaryApp {
	
	public static void main(String[] args) {
		Dictionary dic = new Dictionary(10);
		dic.put("황기태", "자바");
		dic.put("이재문", "파이선");
		dic.put("이재문", "C++");
		System.out.println("이재문의 값은 " + dic.get("이재문"));
		System.out.println("황기태의 값은 " + dic.get("황기태"));
		dic.delete("황기태");
		System.out.println("황기태의 값은 " + dic.get("황기태"));
	}
}
