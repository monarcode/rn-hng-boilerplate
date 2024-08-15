import { THEME } from "~/constants/theme"

const colors={
    very_good:"#eeeff4",
    good:"#f29f63",
    poor:'#f97314'

}

export const chartData = [
        {
          stacks: [
            {value: 50, color: colors.poor,zIndex:-1},
            {value: 20, color: colors.good,marginBottom:-10,zIndex:5},
            {value: 20, color: colors.very_good,marginBottom:-10},
          ],
          label: 'Jan',
        },
                {
          stacks: [
            {value: 30, color: colors.poor,},
            {value: 50, color: colors.good,marginBottom:-10},
            {value: 20, color: colors.very_good,marginBottom:-10},
          ],
          label: 'Feb',
        },
                {
          stacks: [
            {value: 10, color: colors.poor,},
            {value: 20, color: colors.good,marginBottom:-10},
            {value: 30, color: colors.very_good,marginBottom:-10},
          ],
          label: 'Mar',
        },
                {
          stacks: [
            {value: 40, color: colors.poor,},
            {value: 30, color: colors.good,marginBottom:-10},
            {value: 20, color: colors.very_good,marginBottom:-10},
          ],
          label: 'April',
        },
                {
          stacks: [
            {value: 30, color: colors.poor,},
            {value: 40, color: colors.good,marginBottom:-10},
            {value: 10, color: colors.very_good,marginBottom:-10},
          ],
          label: 'May',
        },
                {
          stacks: [
            {value: 40, color: colors.poor,},
            {value: 40, color: colors.good,marginBottom:-10},
            {value: 20, color: colors.very_good,marginBottom:-10},
          ],
          label: 'June',
        },
       
      ]