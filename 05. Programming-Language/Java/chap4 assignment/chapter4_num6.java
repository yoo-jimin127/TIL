package chapter4_yoojimin;

import java.util.Scanner;

public class chapter4_num6 {
	public static class Circle {
		private double x, y;
		private int radius;
		
		public Circle ( double x, double y, int radius ) {
			this.x = x; this.y = y; this.radius = radius;
		}
		
		public void show() {
			System.out.println("가장 면적이 큰 원은 (" + x + "," + y + ")" + radius);
		}
	}
	
	public static class CircleManager {
	
		public static void main(String[] args) {
			Scanner scanner = new Scanner (System.in);
			Circle[] c = new Circle[3];
		
			for ( int i = 0; i < c.length; i++ ) {
				System.out.print("x, y, radius >> ");
				double x = scanner.nextDouble();
				double y = scanner.nextDouble();
				int radius = scanner.nextInt();
			
				c[i] = new Circle(x, y, radius);
			}
			
			if ( c[0].radius < c[1].radius ) {
				if ( c[1].radius < c[2].radius ) {
					c[2].show();
				}
				else {
					c[1].show();
				}
			}
			
			else if ( c[0].radius > c[1].radius ) {
				if ( c[1].radius > c[2].radius ) {
					c[0].show();
				}
				else {
					if (c[0].radius < c[2].radius ) {
						c[2].show();
					}
					else c[0].show();
				}
			}
			
			scanner.close();
		}
	}
}
