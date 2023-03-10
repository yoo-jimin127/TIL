package chapter3_yoojimin;
import java.util.Scanner;
public class chapter3_num8 {

	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		System.out.print("정수 몇개?");
		int repeat = scanner.nextInt();
		
		int intArray [] = new int [repeat];
		
		for(int i=0; i < intArray.length; i++) {
			int rand = (int)(Math.random()*100 + 1);
			intArray[i] = rand;
			for(int j=0; j < i; j++) {
				if(intArray[i] == intArray[j]) {
					i--;
					break;
				}
			}
		}
		
		int line = 0;
		for(int i =0; i < intArray.length; i++) {
			System.out.print(intArray[i] +" ");
			line++;
			if(line%10==0) {
				System.out.println();
				}
			}
		
		scanner.close();
	}
}
