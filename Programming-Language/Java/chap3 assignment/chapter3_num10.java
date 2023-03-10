package chapter3_yoojimin;

public class chapter3_num10 {
	
	public static void main (String[] args) {
	
		int intArray[][] = new int[4][4];
		int count = 0;
		
		for (int i = 0; i < intArray.length; i++) {
			for (int j = 0; j < intArray[i].length; j++) {
				intArray[i][j] = 0;
			}
		}
		
		while (count < 10) {
			int i = (int)(Math.random()*4); 
			int j = (int)(Math.random()*4); 
			
			if (intArray[i][j] != 0) { 
				continue;
			}
			else { 
				intArray[i][j] = (int)(Math.random()*10+1);
				count++;
			}
		}
		
		for (int i = 0; i < intArray.length; i++) {
			for (int j = 0; j < intArray[i].length; j++) {
				System.out.print(intArray[i][j]);
				System.out.print("\t");
			}
			System.out.println();
		}
	}
}
