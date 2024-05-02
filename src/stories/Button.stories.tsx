import {Meta ,StoryObj } from "@storybook/react"
import Button from "@/components/ui/Button"

const meta:Meta <typeof Button> = {
    component:Button,
    parameters:{
        layout: 'centered',
    },
    tags:['autodocs']
};

export default meta;
type Story = StoryObj<typeof Button>

export const Primary : Story = {
    args:{
        intent:"primary",
        btn_size:'lg',
        children:"Primary lg",
    }
}
export const Secondary : Story = {
    args:{
        intent:"secondary",
        btn_size:'sm',
        children:"Seconday sm",
    }
}