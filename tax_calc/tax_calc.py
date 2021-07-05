from tkinter import *

class IncomeTax:
    def __init__(self, income):
        self.income = income

    def calc(self):
        if self.income <= 18200:
            self.rate = 0
        if self.income > 18200 and self.income <= 37000:
            self.rate = 19
        if self.income > 37000 and self.income <= 87000:
            self.rate = 32.5
        if self.income > 87000 and self.income <= 180000:
            self.rate = 37
        if self.income > 180000:
            self.rate = 45

        print('Tax rate : ', self.rate, '%')
        self.rate /= 100
        deduct = self.income*self.rate
        print('Tax deduction : ', deduct)
        pocket = self.income - deduct
        print('Net pay after tax ', pocket)

if __name__ == '__main__':
    income = float(input("Enter your annual income: "))
    i = IncomeTax(income)
    i.calc()
