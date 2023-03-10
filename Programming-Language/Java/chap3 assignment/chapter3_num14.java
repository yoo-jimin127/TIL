package chapter3_yoojimin;
import java.util.Scanner;
public class chapter3_num14 {

	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		String[] course = {"Java", "C++", "HTML5", "컴퓨터구조", "안드로이드"};
		int[] score = {95, 88, 76, 62, 55};
		int i = 0;
		
		while(true) {
			System.out.print("과목 이름>>");
			String name = scanner.next();
			
			for (i = 0; i < course.length; i++) {
				if ( name.equals(course[i])) {
					System.out.println(course[i] + "의 점수는 " + score[i]);
					break;
				}
			}
		
			if(name.equals("그만")) break;
			
			if( i == course.length) {
				System.out.println("없는 과목입니다.");
			}
			
		}
		scanner.close();
	}
}
